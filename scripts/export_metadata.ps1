<#
.SYNOPSIS
    Inspects a ComfyUI output PNG file and extracts prompt metadata and workflow graphs.
.PARAMETER ImagePath
    Path to the PNG file.
#>
param (
    [Parameter(Mandatory=$false)]
    [string]$ImagePath = ""
)

if (-not $ImagePath) {
    $ImagePath = Join-Path $PSScriptRoot "..\assets\outputs\auralis_nova_hero_key_visual.png"
}

$resolved = Resolve-Path -LiteralPath $ImagePath -ErrorAction SilentlyContinue
if (-not $resolved) {
    Write-Error "File not found: $ImagePath"
    exit 1
}

Write-Host "=================================================="
Write-Host "ComfyUI PNG Metadata Inspector"
Write-Host "Inspecting: $($resolved.Path)"
Write-Host "=================================================="

$fs = [System.IO.File]::OpenRead($resolved.Path)
$br = New-Object System.IO.BinaryReader($fs)
$header = $br.ReadBytes(8)

$metadata = @{}
while ($fs.Position -lt $fs.Length) {
    if ($fs.Length - $fs.Position -lt 8) { break }
    $lenBytes = $br.ReadBytes(4); [Array]::Reverse($lenBytes); $len = [System.BitConverter]::ToUInt32($lenBytes, 0)
    $typeBytes = $br.ReadBytes(4); $chunkType = [System.Text.Encoding]::ASCII.GetString($typeBytes)
    
    if ($chunkType -eq 'tEXt') {
        $data = $br.ReadBytes($len)
        $text = [System.Text.Encoding]::UTF8.GetString($data)
        $nullIndex = $text.IndexOf([char]0)
        if ($nullIndex -gt 0) {
            $key = $text.Substring(0, $nullIndex)
            $val = $text.Substring($nullIndex + 1)
            $metadata[$key] = $val
        }
    } elseif ($chunkType -eq 'IHDR') {
        $ihdr = $br.ReadBytes($len)
        $wBytes = $ihdr[0..3]; [Array]::Reverse($wBytes); $w = [System.BitConverter]::ToUInt32($wBytes, 0)
        $hBytes = $ihdr[4..7]; [Array]::Reverse($hBytes); $h = [System.BitConverter]::ToUInt32($hBytes, 0)
        $metadata['Dimensions'] = "$w x $h"
    } else {
        $fs.Seek($len, [System.IO.SeekOrigin]::Current) | Out-Null
    }
    $crc = $br.ReadBytes(4)
}
$br.Close()
$fs.Close()

Write-Host "Image Dimensions : $($metadata['Dimensions'])"
Write-Host "Has 'prompt' key : $(if ($metadata['prompt']) { 'Yes' } else { 'No' })"
Write-Host "Has 'workflow' key: $(if ($metadata['workflow']) { 'Yes' } else { 'No' })"

if ($metadata['prompt']) {
    try {
        $p = $metadata['prompt'] | ConvertFrom-Json
        Write-Host "`nSampling Nodes Found in Prompt Chunk:"
        foreach ($prop in $p.PSObject.Properties) {
            $node = $prop.Value
            if ($node.inputs.seed -or $node.class_type -match 'Sampler') {
                Write-Host "  - Node $($prop.Name) [$($node.class_type)]"
                Write-Host "      Seed: $($node.inputs.seed)"
                Write-Host "      Steps: $($node.inputs.steps)"
                Write-Host "      CFG: $($node.inputs.cfg)"
            }
        }
    } catch {
        Write-Warning "Could not parse prompt JSON"
    }
}
Write-Host "`nInspection complete."
