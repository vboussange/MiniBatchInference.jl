using LinearAlgebra, ParametricModels, OrdinaryDiffEq, DiffEqSensitivity
using Bijectors: Exp, inverse, Identity, Stacked
using UnPack
using OptimizationOptimisers
using Test
using MiniBatchInference

@model MyModel
function (m::MyModel)(du, u, p, t)
    @unpack b = p
    du .=  0.1 .* u .* ( 1. .- b .* u) 
end

tsteps = 1.:0.5:100.5
tspan = (tsteps[1], tsteps[end])

p_true = (b = [0.23, 0.5],)
p_init= (b = [1., 2.],)

u0 = ones(2)
mp = ModelParams(p_true, 
                tspan,
                u0, 
                BS3(),
                sensealg = ForwardDiffSensitivity();
                saveat = tsteps, 
                )
model = MyModel(mp)
sol_data = simulate(model)
ode_data = Array(sol_data)
optimizers = [Adam(0.001)]
epochs = [5000]

@testset "minibatch MLE" begin
    res = minibatch_MLE(p_init = p_init, 
                        group_size = 101, 
                        data_set = ode_data, 
                        model = model, 
                        tsteps = tsteps, 
                        epochs = epochs, 
                        optimizers = optimizers,
                        )
    @test all(isapprox.(res.p_trained, p_true[:b], atol = 1e-4 ))
end


@testset "MLE 1 group" begin
    ode_data_wnoise = ode_data .+ randn(size(ode_data)) .* 0.1
    res = minibatch_MLE(p_init = p_init, 
                        group_size = size(ode_data,2) + 1, 
                        data_set = ode_data_wnoise, 
                        model = model, 
                        tsteps = tsteps, 
                        optimizers = optimizers,
                        epochs = epochs)
    @test all( isapprox.(res.p_trained, p_true[:b], rtol = 1e-1))
end

@testset "minibatch MLE independent TS" begin
    tsteps_arr = [tsteps[1:30],tsteps[31:60],tsteps[61:90]] # 3 ≠ time steps with ≠ length

    u0s = [rand(2) .+ 1, rand(2) .+ 1, rand(2) .+ 1]
    ode_datas = []
    for (i,u0) in enumerate(u0s) # generating independent time series
        sol_data = simulate(model; u0, saveat = tsteps_arr[i], sensealg = ForwardDiffSensitivity())
        ode_data = Array(sol_data) 
        ode_data .+=  randn(size(ode_data)) .* 0.1
        push!(ode_datas, ode_data)
    end

    optimizers = [Adam(0.001)]
    epochs = [5000]

    res = minibatch_ML_indep_TS(data_set = ode_datas, 
                        group_size = 31, 
                        tsteps = tsteps_arr, 
                        p_init = p_init, 
                        model = model, 
                        epochs = epochs, 
                        optimizers = optimizers,
                        )
    @test all(isapprox.(res.p_trained, p_true[:b], rtol = 1e-1 ))
end

@testset "Initialisation iterative minibatch ML" begin
    group_size_init = 11
    datasize = 100
    ranges_init = group_ranges(datasize, group_size_init)
    group_size_2 = 21
    ranges_2 = group_ranges(datasize, group_size_2)
    pred_init = [cumsum(ones(3, length(rng)), dims=2) for rng in ranges_init]

    u0_2 = MiniBatchInference._initialise_u0s_iterative_minibatch_ML(pred_init, ranges_init, ranges_2)
    @test all(u0_2 .== 1.)
end

@testset "Iterative minibatch MLE" begin
    ode_data_wnoise = ode_data .+ randn(size(ode_data)) .* 0.1
    group_size_init = 51

    # defining group size and learning rates
    datasize = length(tsteps)
    div_data = divisors(datasize)
    group_sizes = vcat(group_size_init, div_data[div_data .> group_size_init] .+ 1)
    optimizers_array = [[Adam(0.001)] for _ in 1:length(group_sizes)]
    epochs = [5000]
    res_array = iterative_minibatch_MLE(group_sizes = group_sizes, 
                                        optimizers_array = optimizers_array,
                                        epochs = epochs,
                                        p_init = p_init,  
                                        data_set = ode_data_wnoise, 
                                        model = model, 
                                        tsteps = tsteps,)
    @test all( isapprox.(res_array[end].p_trained, p_true[:b], rtol = 1e-1 ))
end