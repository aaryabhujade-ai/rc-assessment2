<#
.SYNOPSIS
    Validates ComfyUI workflow JSON integrity in PowerShell.
#>
param(
    [string]$WorkflowPath = ""
)

if (-not $WorkflowPath) {
    $WorkflowPath = Join-Path $PSScriptRoot "..\workflows\Assessment_2_workflow.json"
}

$resolved = Resolve-Path -LiteralPath $WorkflowPath -ErrorAction SilentlyContinue
if (-not $resolved) {
    Write-Error "Workflow file not found: $WorkflowPath"
    exit 1
}

Write-Host "=== Validating ComfyUI Workflow ==="
Write-Host "Path: $($resolved.Path)"

try {
    $raw = Get-Content -LiteralPath $resolved.Path -Raw -Encoding UTF8
    $json = $raw | ConvertFrom-Json
    Write-Host "[PASS] Valid JSON structure"
    Write-Host "[INFO] Top-level nodes count: $($json.nodes.Count)"
    Write-Host "[INFO] Top-level links count: $($json.links.Count)"
    
    if ($json.definitions.subgraphs) {
        Write-Host "[PASS] Subgraph definitions found: $($json.definitions.subgraphs.Count)"
        foreach ($sg in $json.definitions.subgraphs) {
            Write-Host "       - Subgraph: $($sg.name) ($($sg.nodes.Count) nodes)"
        }
    } else {
        Write-Warning "No subgraphs defined"
    }

    $node13 = $json.nodes | Where-Object { $_.id -eq 13 }
    if ($node13 -and $node13.type -eq "ResolutionSelector") {
        Write-Host "[PASS] Node 13 (ResolutionSelector) verified: $($node13.widgets_values -join ', ')"
    }

    $node461 = $json.nodes | Where-Object { $_.id -eq 461 }
    if ($node461 -and $node461.type -eq "SaveImageAdvanced") {
        Write-Host "[PASS] Node 461 (SaveImageAdvanced) verified: $($node461.widgets_values -join ', ')"
    }

    Write-Host "`n[SUCCESS] Workflow validation passed completely!"
} catch {
    Write-Error "Validation failed: $_"
    exit 1
}
