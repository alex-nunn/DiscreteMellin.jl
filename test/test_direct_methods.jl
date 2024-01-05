@testset "direct_methods" begin
    f = t -> exp(-t)  # test function
    f_mellin = s -> gamma(s)  # mellin transform of test function

    ts = range(0, 10, 1000)
    fs = f.(ts)

    ωs = range(0, 10, 100)[2:end]
    ss = 1im * ωs

    expect = @. f_mellin(ss)
    expect_mod = @. ss * f_mellin(ss)

    @testset "mellin_pconstant" begin
        result = mellin_pconstant(fs, ωs; step=step(ts))
        @test norm(result - expect, Inf) < 1e-1
        result_mod = mellin_pconstant(fs, ωs; step=step(ts), modified=true)
        @test norm(result_mod - expect_mod, Inf) < 1e-1
    end

    @testset "mellin_plinear" begin
        result = mellin_plinear(fs, ωs; step=step(ts))
        @test norm(result - expect, Inf) < 1e-4
        result_mod = mellin_plinear(fs, ωs; step=step(ts), modified=true)
        @test norm(result_mod - expect_mod, Inf) < 1e-4
    end
end