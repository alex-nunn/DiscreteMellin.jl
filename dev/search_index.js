var documenterSearchIndex = {"docs":
[{"location":"reference/#Reference","page":"Reference","title":"Reference","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"CurrentModule = DiscreteMellin","category":"page"},{"location":"reference/","page":"Reference","title":"Reference","text":"","category":"page"},{"location":"reference/","page":"Reference","title":"Reference","text":"Modules = [DiscreteMellin]","category":"page"},{"location":"reference/#DiscreteMellin.mellin_pconstant-Tuple{AbstractVector{<:Real}, AbstractVector}","page":"Reference","title":"DiscreteMellin.mellin_pconstant","text":"mellin_pconstant(signal, ωs; modified, step)\n\nEvaluate the Mellin transform by numerical quadrature using piecewise constant interpolation. Behaviour is identical to mellin_plinear.\n\nThis is the method proposed by Zwicke et al. (1983).\n\nReferences\n\n[1] Zwicke, P. E., & Kiss, I. (1983). A new implementation of the Mellin      transform and its application to radar classification of ships.      [10.1109/TPAMI.1983.4767371]\n\nSee also mellin_plinear\n\n\n\n\n\n","category":"method"},{"location":"reference/#DiscreteMellin.mellin_plinear-Tuple{AbstractVector{<:Real}, AbstractVector}","page":"Reference","title":"DiscreteMellin.mellin_plinear","text":"mellin_plinear(signal, ωs; modified, step)\n\nEvaluate the Mellin transform by numerical quadrature. The discrete signal is interpolated as a piecewise linear function and the transform is evaluated at points along the imaginary axis, im * ωs.\n\nThe Mellin transform is strongly influenced by the behaviour of the function close to the origin. This can present a challenge when the Mellin transform is used for scale-invariant signal analysis as this weighting can obscure other variations further from the origin. To remedy this issue Zwicke et al. (1983) proposed a modified Mellin transform s F(s) where F(s) is the Mellin transform of the original signal.\n\nArguments\n\nsignal : values of discrete signal on a uniform grid (including the origin)\nωs : Mellin-space frequencies to evaluate on imaginary axis\nstep : spacing of discrete signal (default 1)\nmodified : compute the modified Mellin transform as defined in [1]\n\nReferences\n\n[1] Zwicke, P. E., & Kiss, I. (1983). A new implementation of the Mellin      transform and its application to radar classification of ships.      [10.1109/TPAMI.1983.4767371]\n\nSee also mellin_pconstant\n\n\n\n\n\n","category":"method"},{"location":"benchmark/#Benchmark","page":"Benchmark","title":"Benchmark","text":"","category":"section"},{"location":"benchmark/","page":"Benchmark","title":"Benchmark","text":"The functions mellin_plinear and mellin_pconstant estimate the Mellin transform of discrete time signals on the imaginary axis in frequency space. This estimate is derived by evaluating the continuous Mellin transform integral with an interpolation of the discrete data,","category":"page"},{"location":"benchmark/","page":"Benchmark","title":"Benchmark","text":"mathcalMf(s) = int_0^infty f(t) t^s-1 dt = sum_i=1^n f(t_i) int_0^infty B_i(t) t^s-1dt ","category":"page"},{"location":"benchmark/","page":"Benchmark","title":"Benchmark","text":"where B_i(t) are the nodal basis functions of the interpolation.","category":"page"},{"location":"benchmark/","page":"Benchmark","title":"Benchmark","text":"We can compare the convergence rates of the piecewise constant and linear interpolation methods by comparing the absolute error in the predicted Mellin transforms. A comparison for the known Mellin transform pair,","category":"page"},{"location":"benchmark/","page":"Benchmark","title":"Benchmark","text":"f(t) = e^t qquad mathcalMf(s) = Gamma(s)","category":"page"},{"location":"benchmark/","page":"Benchmark","title":"Benchmark","text":"is shown below.","category":"page"},{"location":"benchmark/","page":"Benchmark","title":"Benchmark","text":"using Plots\nusing LaTeXStrings\nusing DiscreteMellin\nusing SpecialFunctions\nusing LinearAlgebra\n\n# Convergence test 1.\n# Test function & transform\nf = t -> exp(-t)  \nf_mellin = s -> gamma(s)\n\n# Mellin space frequencies\nωs = range(0, 10, 100)[2:end]\nss = 1im * ωs\nexpect_mod = @. ss * f_mellin(ss)\n\n# Convergence study\nNs = 100:500:10000\ntransforms = (mellin_pconstant, mellin_plinear)\n\nstudy = map(Ns) do N\n    ts = range(0, 20, N)\n    fs = f.(ts)\n\n    return [\n        norm(transform(fs, ωs; step=step(ts), modified=true) - expect_mod, Inf)\n        for transform ∈ transforms\n    ]\nend |> stack\n\nplot(\n    Ns, transpose(study);\n    title=L\"Convergence comparison: $f(t)=e^t$\",\n    xlabel=L\"$N$ (number of samples)\",\n    ylabel=L\"$\\Vert \\cdot\\Vert_\\infty$ error\",\n    labels=[\"mellin_pconstant\" \"mellin_plinear\"],\n    xscale=:log10,\n    yscale=:log10,\n    linewidth=2,\n    size=(500, 450),\n    frame=:box\n)\nsavefig(\"01_benchmark.png\"); nothing # hide","category":"page"},{"location":"benchmark/","page":"Benchmark","title":"Benchmark","text":"(Image: )","category":"page"},{"location":"#DiscreteMellin","page":"Home","title":"DiscreteMellin","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Methods for evaluating the Mellin transform of discrete time signals.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Code available on github at DiscreteMellin.","category":"page"},{"location":"#Requirements","page":"Home","title":"Requirements","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Requires Julia version >= 1.10","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This package can be installed in a Julia environment using the command","category":"page"},{"location":"","page":"Home","title":"Home","text":"import Pkg\nPkg.add(\"https://github.com/alex-nunn/DiscreteMellin.jl\")","category":"page"}]
}
