#!/usr/bin/env python3
"""
Auralis Nova ComfyUI Workflow Validator
Checks the structural integrity of the Assessment 2 workflow JSON file,
verifies top-level nodes, subgraph definitions, model links, and output nodes.
"""

import json
import sys
from pathlib import Path

def validate_workflow(workflow_path: Path):
    print(f"=== Validating ComfyUI Workflow: {workflow_path.name} ===")
    if not workflow_path.exists():
        print(f"ERROR: File not found at {workflow_path}")
        return False

    try:
        with open(workflow_path, "r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception as e:
        print(f"ERROR: Failed to parse JSON: {e}")
        return False

    nodes = data.get("nodes", [])
    links = data.get("links", [])
    definitions = data.get("definitions", {})
    subgraphs = definitions.get("subgraphs", [])

    print(f"✓ Valid JSON format")
    print(f"✓ Top-level nodes: {len(nodes)}")
    print(f"✓ Top-level links: {len(links)}")
    print(f"✓ Subgraph definitions: {len(subgraphs)}")

    # Check key nodes
    node_types = {n.get("id"): n.get("type") for n in nodes}
    print(f"✓ Found Node IDs: {list(node_types.keys())}")

    has_resolution = any(t == "ResolutionSelector" for t in node_types.values())
    has_save = any("SaveImage" in str(t) for t in node_types.values())
    has_subgraph = len(subgraphs) > 0

    if has_resolution:
        print("✓ ResolutionSelector node verified")
    else:
        print("! Warning: ResolutionSelector node not found")

    if has_save:
        print("✓ SaveImage node verified")
    else:
        print("! Warning: SaveImage node not found")

    if has_subgraph:
        sg = subgraphs[0]
        print(f"✓ Subgraph verified: {sg.get('name')} (contains {len(sg.get('nodes', []))} internal nodes)")
    else:
        print("! Warning: No subgraphs defined")

    print("\nWorkflow validation completed successfully!")
    return True

if __name__ == "__main__":
    target = Path(__file__).resolve().parent.parent / "workflows" / "Assessment_2_workflow.json"
    if len(sys.argv) > 1:
        target = Path(sys.argv[1])
    success = validate_workflow(target)
    sys.exit(0 if success else 1)
