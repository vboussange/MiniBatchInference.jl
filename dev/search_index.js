var documenterSearchIndex = {"docs":
[{"location":"#PiecewiseInference.jl","page":"PiecewiseInference.jl","title":"PiecewiseInference.jl","text":"","category":"section"},{"location":"","page":"PiecewiseInference.jl","title":"PiecewiseInference.jl","text":"DocStringExtensions.README","category":"page"},{"location":"","page":"PiecewiseInference.jl","title":"PiecewiseInference.jl","text":"Modules = [PiecewiseInference]","category":"page"},{"location":"#PiecewiseInference.PiecewiseInference","page":"PiecewiseInference.jl","title":"PiecewiseInference.PiecewiseInference","text":"PiecewiseInference.jl\n\n(Image: ) (Image: ) (Image: Build status (Github Actions)) (Image: codecov.io)\n\nSuite for inverse modeling, combining ML techniques and mechanistic models (dynamical ODEs).\n\n(Image: )\n\nInstallation\n\nPiecewiseInference.jl has ParametricModels.jl in its dependency, a non-registered package. As such, to install PiecewiseInference.jl, you need to first add an extra registry to your Julia installation - but this is very easy! Open Julia and type the following\n\nusing Pkg\npkg\"registry add https://github.com/vboussange/VBoussangeRegistry.git\"\n\nThen go on and \n\npkg\"add PiecewiseInference\"\n\nThat's it! This will download the latest version of PiecewiseInference.jl from this git repo and download all dependencies.\n\nGetting started\n\nSee the documentation and the test folder for up-to-date examples.\n\nRelated packages\n\nDiffEqFlux is a package with similar goals as MiniBatchInference, and proposes the method DiffEqFlux.multiple_shooting, which is close to MiniBatchInference.minibatch_MLE but where initial conditions are not inferred. MiniBatchInference further proposes several utility methods for model selection, and aims in a near future at proposing full bayesian inference, bridging with Turing.\n\nReference\n\nBoussange, V., Vilimelis-Aceituno, P., Pellissier, L., Mini-batching ecological data to improve ecosystem models with machine learning bioRxiv, 46 pages.\n\n\n\n\n\n","category":"module"},{"location":"#PiecewiseInference.InferenceProblem-Union{Tuple{T}, Tuple{M}, Tuple{M, T}} where {M<:ParametricModels.AbstractModel, T<:NamedTuple}","page":"PiecewiseInference.jl","title":"PiecewiseInference.InferenceProblem","text":"InferenceProblem(\n    model,\n    p0;\n    p_bij,\n    u0_bij,\n    loss_param_prior,\n    loss_u0_prior,\n    loss_likelihood\n)\n\n\nArgs\n\nmodel: a model of type AbstractModel.\np0: initial guess of the parameters. Should be a named tuple.\n\nOptional\n\np_bij: a tuple with same length as p0, containing bijectors, to constrain parameter values.\nu0_bij: a bijector for to constrain state variables u0.\nloss_param_prior is a function with arguments p::NamedTuple. Should correspond to parameter priors.\n\nBy default, loss_param_prior(p) = 0.\n\nloss_u0_prior is a function with arguments u0_pred, u0_data. Should correspond to IC priors.\n\nBy default it corresponds to RSS between u0 and the corresponding data point.\n\nloss_likelihood is a function that matches the predictions and the data,\n\nwhich should have as arguments data, pred, rng. By default, it corresponds to the RSS.\n\n\n\n\n\n","category":"method"},{"location":"#PiecewiseInference.AIC-Tuple{Any, Any, Any}","page":"PiecewiseInference.jl","title":"PiecewiseInference.AIC","text":"AIC(RSS, k, m)\n\nCalculate AIC of a model given its RSS,  k its number of parameters,  and m the number of observations.\n\n\n\n\n\n","category":"method"},{"location":"#PiecewiseInference.AIC-Tuple{InferenceResult, Array, Distributions.Sampleable}","page":"PiecewiseInference.jl","title":"PiecewiseInference.AIC","text":"AIC(res, data_set, noisedistrib)\n\n\nComputes the AIC of res given the observational noise distribution noisedistrib.\n\n\n\n\n\n","category":"method"},{"location":"#PiecewiseInference.AIC-Union{Tuple{P}, Tuple{T}, Tuple{T, P}} where {T<:AbstractFloat, P<:Integer}","page":"PiecewiseInference.jl","title":"PiecewiseInference.AIC","text":"AIC(logl, nparams)\n\n\nComputes the AIC given loglikelihood logl and number of parameters nparams.\n\n\n\n\n\n","category":"method"},{"location":"#PiecewiseInference.AICc-Tuple{Any, Any, Any}","page":"PiecewiseInference.jl","title":"PiecewiseInference.AICc","text":"AICc(aic, k, m)\n\nCalculate AIC corrected of a model given its aic,  k its number of parameters,  and m the number of observations  (if d variables and T time steps, m = d * T).  The formula is taken from Mangan2017.\n\n\n\n\n\n","category":"method"},{"location":"#PiecewiseInference.AICc_TREE-Tuple{Any, Any, Any}","page":"PiecewiseInference.jl","title":"PiecewiseInference.AICc_TREE","text":"AICc_TREE(RSS, k, m)\n\nCalculate aic of a model given its RSS,  k its number of parameters,  and m the number of observations. The formula is taken from TREE article.\n\n\n\n\n\n","category":"method"},{"location":"#PiecewiseInference.FIM_strouwen-Tuple{Any, Any, Any}","page":"PiecewiseInference.jl","title":"PiecewiseInference.FIM_strouwen","text":"FIM_strouwen(predict, θ, Σ)\n\nReturns the FIM matrix associated to predict and evaluated at θ taken from https://arnostrouwen.com/post/dynamic-experimental-design/\n\npredict is a function that takes θ as a parameter and returns an array \nwith dim=1 corresponding to state variables and \ndim = 2 corresponding to the time steps\nθ the parameter vector where to evaluate the FIM\nΣ is the variance-covariance matrix of the observation errors\n\n\n\n\n\n","category":"method"},{"location":"#PiecewiseInference.FIM_yazdani-NTuple{6, Any}","page":"PiecewiseInference.jl","title":"PiecewiseInference.FIM_yazdani","text":"FIM_yazdani(dudt, u0_true, tspan, p_true, Σ)\n\nReturns the FIM matrix associated to problem defined by prob = ODEProblem(dudt, u0_true, tspan, p_true). Σ is the variance-covariance matrix of the observation errors\n\n\n\n\n\n","category":"method"},{"location":"#PiecewiseInference.R2-Tuple{AbstractArray, AbstractArray, Distributions.MvLogNormal}","page":"PiecewiseInference.jl","title":"PiecewiseInference.R2","text":"R2(odedata, pred, _)\n\n\nWe distinguish between R2 for log transformed values (with `dist::MvLogNormal` as last argument) \nand standard R2, to discard non positive values in the former case.\n\n\n\n\n\n","category":"method"},{"location":"#PiecewiseInference.RSS-Union{Tuple{T}, Tuple{InferenceResult, Array, T}} where T<:Distributions.Sampleable","page":"PiecewiseInference.jl","title":"PiecewiseInference.RSS","text":"RSS(res, data_set, noisedistrib)\n\n\nComputes the RSS of res given data_set.\n\nArgument:\n\nfn is set to identity but can be e.g. log if lognormal loss used.\n\n\n\n\n\n","category":"method"},{"location":"#PiecewiseInference._init_u0s-NTuple{4, Any}","page":"PiecewiseInference.jl","title":"PiecewiseInference._init_u0s","text":"_init_u0s(infprob, u0s_init, data, ranges)\n\n\nu0s_init should come as a vector of u0, i.e. a vector of vector. We ouput it as a vector of scalar, after tranformation in the optimization space.\n\n\n\n\n\n","category":"method"},{"location":"#PiecewiseInference.compute_cis-Tuple{InferenceResult, Any, Any, Any, Any, Any}","page":"PiecewiseInference.jl","title":"PiecewiseInference.compute_cis","text":"compute_cis(reseco, odedata, noisedistrib, p, α, σ)\n\n\n\n\n\n\n","category":"method"},{"location":"#PiecewiseInference.compute_cis-Tuple{Matrix, Vector, AbstractFloat}","page":"PiecewiseInference.jl","title":"PiecewiseInference.compute_cis","text":"compute_cis(var_cov_matrix, p, α)\n\n\nCompute confidence intervals, given var_cov_matrix, parameters p and a confidence level α.\n\n\n\n\n\n","category":"method"},{"location":"#PiecewiseInference.divisors-Tuple{Any}","page":"PiecewiseInference.jl","title":"PiecewiseInference.divisors","text":"divisors(n)\n\nReturns all divisors of n, sorted.\n\n\n\n\n\n","category":"method"},{"location":"#PiecewiseInference.estimate_σ-Tuple{Array, Array, Distributions.MvNormal}","page":"PiecewiseInference.jl","title":"PiecewiseInference.estimate_σ","text":"estimate_σ(pred, odedata, _)\n\n\nEstimate noise variance, assuming similar noise across all the dimensions of the data.\n\n\n\n\n\n","category":"method"},{"location":"#PiecewiseInference.get_evidence-Tuple{Matrix, Any, Any, InferenceProblem, NamedTuple, Vector}","page":"PiecewiseInference.jl","title":"PiecewiseInference.get_evidence","text":"get_evidence(data, tsteps, ranges, infprob, p, u0s)\n\n\nProvides evidence p(M|data) = ∫p(data|M, θ) p(θ) p(M) dθ for model M stored in infprob given the data,  using MAP estimate p and u0s. Here it is assumed that p(M) = 1.\n\nRelies on Laplace's method\n\nNote\n\nFor now, we do not integrate over initial conditions u0s, but this may be considered.\n\n\n\n\n\n","category":"method"},{"location":"#PiecewiseInference.get_ranges-Tuple{}","page":"PiecewiseInference.jl","title":"PiecewiseInference.get_ranges","text":"get_ranges(; group_size, group_nb, datasize)\n\n\n\n\n\n\n","category":"method"},{"location":"#PiecewiseInference.get_var_covar_matrix-Tuple{InferenceResult, Array, Distributions.Sampleable}","page":"PiecewiseInference.jl","title":"PiecewiseInference.get_var_covar_matrix","text":"get_var_covar_matrix(reseco, odedata, noisedistrib)\n\n\n\n\n\n\n","category":"method"},{"location":"#PiecewiseInference.group_ranges_gn-Tuple{Integer, Integer}","page":"PiecewiseInference.jl","title":"PiecewiseInference.group_ranges_gn","text":"group_ranges_gn(datasize, group_nb)\n\n\nSimilar to `group_ranges`, except that it takes as arguments the nb of groups wanted, `group_nb`\n\n\n\n\n\n","category":"method"},{"location":"#PiecewiseInference.group_ranges_gs-Tuple{Integer, Integer}","page":"PiecewiseInference.jl","title":"PiecewiseInference.group_ranges_gs","text":"group_ranges_gs(datasize, group_size)\n\n\nGet ranges that partition data of length datasize in groups of groupsize observations. If the data isn't perfectly dividable by groupsize, the last group contains the reminding observations. Taken from https://github.com/SciML/DiffEqFlux.jl/blob/80c4247c19860d0422211d6a65283d896eeaa831/src/multiple_shooting.jl#L273-L303\n\ngroup_ranges(datasize, groupsize)\n\nArguments:\n\ndatasize: amount of data points to be partitioned\ngroupsize: maximum amount of observations in each group\n\nExample:\n\njulia> group_ranges(10, 5)\n3-element Vector{UnitRange{Int64}}:\n 1:5\n 5:9\n 9:10\n\n\n\n\n\n","category":"method"},{"location":"#PiecewiseInference.iterative_piecewise_MLE-Tuple{Any}","page":"PiecewiseInference.jl","title":"PiecewiseInference.iterative_piecewise_MLE","text":"iterative_piecewise_MLE(\n    infprob;\n    group_sizes,\n    group_nbs,\n    optimizers_array,\n    threshold,\n    kwargs...\n)\n\n\nPerforms a iterative piecewise MLE, iterating over group_sizes.  Stops the iteration when loss function increases between two iterations.\n\nReturns an array with all InferenceResult obtained during the iteration. For kwargs, see piecewise_MLE.\n\nNote\n\nfor now, does not support independent time series (piecewise_ML_indep_TS).\nat every iteration, initial conditions are initialised given the predition of previous iterations\n\nSpecific arguments\n\ngroup_sizes : array of group sizes to test\noptimizers_array: optimizersarray[i] is an array of optimizers for the trainging process of `groupsizes[i]`\n\n\n\n\n\n","category":"method"},{"location":"#PiecewiseInference.loss_param_prior_from_dict-Tuple{Any, Any}","page":"PiecewiseInference.jl","title":"PiecewiseInference.loss_param_prior_from_dict","text":"loss_param_prior_from_dict(params, param_distrib)\n\n\nReturns the loglikelihood of params given the prior distribution of the parameters param_distrib\n\nparams: params, in the form of NamedTuple\nparam_distrib: in the form of a Dictionary or a NamedTuple, with entries p::String => \"d::Distribution\"\n\n\n\n\n\n","category":"method"},{"location":"#PiecewiseInference.moments!-Tuple{Any, Any}","page":"PiecewiseInference.jl","title":"PiecewiseInference.moments!","text":"moments!(xx, x)\n\nreurns the moments of x as a vector stored in xx\n\nArgs\nxx : the covariate vector\nx :  the state variable vector\n\n\n\n\n\n","category":"method"},{"location":"#PiecewiseInference.moments-Tuple{Any}","page":"PiecewiseInference.jl","title":"PiecewiseInference.moments","text":"moments(x)\n\nreurns the moments of x as a vector\n\nArgs\nxx : the covariate vector\nx :  the state variable vector\n\n\n\n\n\n","category":"method"},{"location":"#PiecewiseInference.piecewise_MLE-Tuple{Any}","page":"PiecewiseInference.jl","title":"PiecewiseInference.piecewise_MLE","text":"piecewise_MLE(infprob; group_size, group_nb, kwargs...)\n\n\nPiecewise inference. Loops through the optimizers optimizers. Returns a InferenceResult.\n\nArguments\n\ninfprob: the InferenceProblem\nopt : array of optimizers\ngroup_size : size of segments\ngroup_nb: alternatively to group_size, one can ask for a certain number of segments\ndata : data\ntsteps : corresponding to data\n\nOptional\n\nu0_init : if not provided, we initialise from data\noptimizers : array of optimizers, e.g. [Adam(0.01)]\nepochs : number of epochs, which length should match that of optimizers\nbatchsizes: array of batch size, which length should match that of optimizers\nverbose_loss : displaying loss\ninfo_per_its = 50,\nplotting : plotting convergence loss\ninfo_per_its = 50,\ncb : call back function.   Must be of the form cb(θs, p_trained, losses, pred, ranges)\nthreshold : default to 1e-6\nsave_pred = true saves predictions\nsave_losses = true saves losses\n\nExamples\n\nusing SciMLSensitivity # provides diffential equation sensitivity methods\nusing UnPack # provides the utility macro @unpack \nusing OptimizationOptimisers, OptimizationFlux # provide the optimizers\nusing LinearAlgebra\nusing ParametricModels\nusing PiecewiseInference\nusing OrdinaryDiffEq\nusing Distributions, Bijectors # used to constrain parameters and initial conditions\n@model MyModel\nfunction (m::MyModel)(du, u, p, t)\n    @unpack b = p\n    du .=  0.1 .* u .* ( 1. .- b .* u) \nend\ntsteps = 1.:0.5:100.5\ntspan = (tsteps[1], tsteps[end])\np_true = (b = [0.23, 0.5],)\np_init= (b = [1., 2.],)\n# Defining the model\n# Pay attention to the semi column before the parameters for `ModelParams`\nu0 = ones(2)\nmp = ModelParams(;p = p_true, \n                tspan,\n                u0, \n                alg = BS3(),\n                sensealg = ForwardDiffSensitivity(),\n                saveat = tsteps, \n                )\nmodel = MyModel(mp)\nsol_data = ParametricModels.simulate(model)\node_data = Array(sol_data)\n# adding some normally distributed noise\nσ_noise = 0.1\node_data_wnoise = ode_data .+ randn(size(ode_data)) .* σ_noise\n# Define the `InferenceProblem`\n# First specifiy which values can the parameter take with bijectors\n# here, `b` is constrained to be ∈ [1e-3, 5e0] and `u0` ∈ [1e-3, 5.]\np_bij = (bijector(Uniform(1e-3, 5e0)),)\nu0_bij = bijector(Uniform(1e-3,5.))\ndistrib_noise = MvNormal(ones(2) * σ_noise^2)\n# defining `loss_likelihood`\nloss_likelihood(data, pred, rng) = sum(logpdf(distrib_noise, data .- pred))\ninfprob = InferenceProblem(model, p_init; p_bij, u0_bij)\noptimizers = [ADAM(0.001)]\nepochs = [5000]\ngroup_nb = 2\nbatchsizes = [1] # batch size used for each optimizer in optimizers (here only one)\n# you could also have `batchsizes = [group_nb]`\nres = piecewise_MLE(infprob,\n                    group_nb = group_nb, \n                    data = ode_data_wnoise, \n                    tsteps = tsteps, \n                    epochs = epochs, \n                    optimizers = optimizers,\n                    batchsizes = batchsizes,\n                    )\n\np_trained = get_p_trained(res)\npred = res.pred\n\n\n\n\n\n","category":"method"},{"location":"#PiecewiseInference.piecewise_ML_indep_TS-Tuple{Any}","page":"PiecewiseInference.jl","title":"PiecewiseInference.piecewise_ML_indep_TS","text":"piecewise_ML_indep_TS(\n    infprob;\n    data,\n    group_size,\n    group_nb,\n    tsteps,\n    save_pred,\n    save_losses,\n    kwargs...\n)\n\n\nSimilar to piecewise_MLE but for independent time series, where data is a vector containing the independent arrays corresponding to the time series, and tsteps is a vector where each entry contains the time steps of the corresponding time series.\n\n\n\n\n\n","category":"method"},{"location":"#PiecewiseInference.piecewise_loss-Tuple{InferenceProblem, AbstractArray, AbstractArray, AbstractArray, AbstractArray, Any}","page":"PiecewiseInference.jl","title":"PiecewiseInference.piecewise_loss","text":"piecewise_loss(\n    infprob,\n    θ,\n    ode_data,\n    tsteps,\n    ranges,\n    idx_rngs\n)\n\n\nReturns a tuple (loss, pred) based on the segmentation of ode_data  into segments with time steps given by tsteps[ranges[i]]. The initial conditions are assumed free parameters for each segments.\n\nArguments:\n\ninfprob: the inference problem\nθ: [u0,p] where p corresponds to the parameters of ode function in the optimization space.\node_data: Original Data to be modeloss_likelihooded.\ntsteps: Timesteps on which ode_data was calculated.\nranges: Vector containg range for each segment.\nidx_rngs: Vector containing the indices of the segments to be included in the loss\n\n\n\n\n\n","category":"method"},{"location":"#PiecewiseInference.pretty_print","page":"PiecewiseInference.jl","title":"PiecewiseInference.pretty_print","text":"pretty_print(p_1)\npretty_print(p_1, p_2)\n\n\nPrints in a nice format the NamedTuple or Dict p_1. If p_true provided, also display its values for comparisions.\n\n\n\n\n\n","category":"function"},{"location":"#StatsAPI.loglikelihood-Tuple{InferenceResult, Array, Distributions.Sampleable}","page":"PiecewiseInference.jl","title":"StatsAPI.loglikelihood","text":"loglikelihood(res, data_set, noisedistrib)\n\n\nComputes the loglikelihood of `res` given the observational noise variance distribution `noisedistrib`.\n\nArgs\n\nnoisedistrib corresponds to the assumed distribution of the noise. \n\nIt can be :MvLogNormal or :MvNormal (comprising the multivariate types)\n\n\n\n\n\n","category":"method"},{"location":"#StatsAPI.loglikelihood-Tuple{Matrix, Any, Any, InferenceProblem, Vector, Vector}","page":"PiecewiseInference.jl","title":"StatsAPI.loglikelihood","text":"loglikelihood(data, tsteps, ranges, infprob, pflat, u0s)\n\n\nGet loglikelihood of infprob evaluated at parameters p and ICs u0s. tsteps, ranges are required to recover the segments used.\n\n\n\n\n\n","category":"method"}]
}
