"""
    mellin_pconstant(signal, ωs; modified, step)

Evaluate the Mellin transform by numerical quadrature using piecewise constant
interpolation. Behaviour is identical to [`mellin_plinear`](@ref).

This is the method proposed by Zwicke et al. (1983).

# References
[1] Zwicke, P. E., & Kiss, I. (1983). A new implementation of the Mellin 
    transform and its application to radar classification of ships. 
    [10.1109/TPAMI.1983.4767371]

See also [`mellin_plinear`](@ref)
"""
function mellin_pconstant(signal::AbstractVector{<:Real}, ωs::AbstractVector; step=1, modified::Bool=false)
    n = length(signal)
    out = zeros(Complex{eltype(signal)}, length(ωs))

    for i ∈ eachindex(ωs)
        s = 1im * ωs[i]
        for j ∈ eachindex(signal)[begin:end-1]
            out[i] += j^s * (signal[j] - signal[j + 1])
        end
        out[i] += n^s * signal[n]

        if !modified
            out[i] /= s
        end

        if step != 1
            out[i] *= step^s
        end
    end

    return out
end


"""
    mellin_plinear(signal, ωs; modified, step)

Evaluate the Mellin transform by numerical quadrature. The discrete signal is
interpolated as a piecewise linear function and the transform is evaluated at
points along the imaginary axis, `im * ωs`.

The Mellin transform is strongly influenced by the behaviour of the function
close to the origin. This can present a challenge when the Mellin transform is
used for scale-invariant signal analysis as this weighting can obscure other
variations further from the origin. To remedy this issue Zwicke et al. (1983)
proposed a modified Mellin transform ``s F(s)`` where ``F(s)`` is the Mellin
transform of the original signal.

# Arguments
- `signal` : values of discrete signal on a uniform grid (including the origin)
- `ωs` : Mellin-space frequencies to evaluate on imaginary axis
- `step` : spacing of discrete signal (default 1)
- `modified` : compute the modified Mellin transform as defined in [1]

# References
[1] Zwicke, P. E., & Kiss, I. (1983). A new implementation of the Mellin 
    transform and its application to radar classification of ships. 
    [10.1109/TPAMI.1983.4767371]

See also [`mellin_pconstant`](@ref)
"""
function mellin_plinear(signal::AbstractVector{<:Real}, ωs::AbstractVector; step=1, modified::Bool=false)
    n = length(signal)
    out = zeros(Complex{eltype(signal)}, length(ωs))

    for i ∈ eachindex(ωs)
        s = 1im * ωs[i]
        for j ∈ eachindex(signal)[begin:end-2]
            out[i] += j^(s+1) * (signal[j] - 2 * signal[j+1] + signal[j+2])
        end
        out[i] += (n-1)^(s+1) * (signal[n-1] - 2 * signal[n]) + n^(s+1) * signal[n]
        out[i] /= modified ? s + 1 : s * (s + 1)

        if step != 1
            out[i] *= step^s
        end
    end
    return out
end

