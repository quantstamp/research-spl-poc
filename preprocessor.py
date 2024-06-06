import sys
import pprint
import re

from solidity_parser import parser

def parse_features_in_solidity(file_path):
    features = []  # List to store features and their line numbers
    
    # Read the file content
    with open(file_path, 'r') as file:
        content = file.readlines()
    
    # Regular expression to find @feature comments
    feature_pattern = re.compile(r'//\s*@feature\s+([^\n]+)')

    # Iterate over each line in the content
    for line_number, line in enumerate(content, 1):
        match = feature_pattern.search(line)
        if match:
            feature = match.group(1).strip()  # Extract the feature description
            features.append((feature, line_number))  # Append the feature and line number to the list

    return features


def find_features_to_remove(feature_flags, parsed_solidity, selected_features):
    results = []
    
    # Identify the correct dictionary containing the 'ContractDefinition'
    contract_nodes = None
    for child in parsed_solidity['children']:
        if child.get('type') == 'ContractDefinition':
            contract_nodes = child['subNodes']
            break
    
    if not contract_nodes:
        return "No contract definition found."

    for feature_name, feature_line in feature_flags:
        if feature_name in selected_features:
            continue
        closest_feature = None
        closest_line = float('inf')

        # Iterate over each sub-node in the contract
        for node in contract_nodes:
            if node['type'] in ['StateVariableDeclaration', 'FunctionDefinition']:
                start_line = node['loc']['start']['line']
                if start_line > feature_line and start_line < closest_line:
                    closest_feature = node
                    closest_line = start_class = start_line
        
        # If a feature was found, record its line start and end numbers
        if closest_feature:
            feature_start = closest_feature['loc']['start']['line']
            feature_end = closest_feature['loc']['end']['line']
            results.append((feature_name, feature_start, feature_end))

    return results

def remove_lines(file_path, lines_to_remove):
    with open(file_path, 'r') as file:
        content = file.readlines()

    lines_to_remove = set().union(*[range(start - 1, end + 1) for _, start, end in lines_to_remove])
    
    new_content = []
    for line_number, line in enumerate(content, 1):
        if line_number in lines_to_remove:
            continue
        new_content.append(line)
    
    with open(file_path + '_copy', 'w') as file:
        file.writelines(new_content)

sourceUnit = parser.parse_file(sys.argv[1], loc=True)
# print(sourceUnit)
features = parse_features_in_solidity(sys.argv[1])
# print(features)
selected_features = ['zircuit']
lines_to_remove = find_features_to_remove(features, sourceUnit, selected_features)
print(lines_to_remove)
remove_lines(sys.argv[1], lines_to_remove)

