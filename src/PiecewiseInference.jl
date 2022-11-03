__precompile__(false)
"""
$(DocStringExtensions.README)
"""
module PiecewiseInference
    using ParametricModels
    using OrdinaryDiffEq
    using Optimization
    using Requires
    using DocStringExtensions

    using ForwardDiff
    using LinearAlgebra
    using LaTeXStrings
    using UnPack
    using Statistics, Distributions

    using ParametricModels
    using Optimisers

    # parametric function
    abstract type ParamFun{N} end
    import Base.length
    length(::ParamFun{N}) where N = N

    include("ResultMLE.jl")
    include("utils.jl")
    include("piecewise_loss.jl")
    include("piecewise_MLE.jl")
    include("statistics.jl")

    plot_convergence(args...;kwargs...) = println("Plotting requires loading package `PyPlot`")
    function __init__()
        @require PyPlot="d330b81b-6aea-500a-939a-2ce795aea3ee" include("plot_convergence.jl")
    end

    export ForwardDiffSensitivity # from DiffEqSensitivity
    export ParamFun, ResultMLE, InferenceResult
    export group_ranges, AIC, AICc, AICc_TREE, moments!, moments, divisors
    export piecewise_loss
    export piecewise_MLE, piecewise_ML_indep_TS, iterative_piecewise_MLE, get_ranges
    export plot_convergence
    export FIM_strouwen, FIM_yazdani, loglikelihood, estimate_σ, RSS, R2
end # module