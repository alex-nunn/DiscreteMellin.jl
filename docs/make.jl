using DiscreteMellin
using Documenter

DocMeta.setdocmeta!(DiscreteMellin, :DocTestSetup, :(using DiscreteMellin); recursive=true)

makedocs(;
    modules=[DiscreteMellin],
    authors="Alex Nunn <alex.nunn@pm.me> and contributors",
    repo="https://github.com/alex-nunn/DiscreteMellin.jl/blob/{commit}{path}#{line}",
    sitename="DiscreteMellin.jl",
    format=Documenter.HTML(;
        prettyurls=get(ENV, "CI", "false") == "true",
        canonical="https://alex-nunn.github.io/DiscreteMellin.jl",
        edit_link="main",
        assets=String[],
    ),
    pages=[
        "Home" => "index.md",
    ],
)

deploydocs(;
    repo="github.com/alex-nunn/DiscreteMellin.jl",
    devbranch="main",
)
