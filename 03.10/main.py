from typing import List, Tuple

def read_graph(filename: str) -> Tuple[List[List[int]], int]:
    with open(filename, 'r') as file:
        lines = file.readlines()

    vertex_count = int(lines[0].strip())
    adjacency_list: List[List[int]] = []

    for line in lines[1:]:
        neighbors = list(map(int, line.strip().split()))
        adjacency_list.append(neighbors)

    return adjacency_list, vertex_count

def write_neighbours_list(adjacency_list: List[List[int]]) -> None:
    for vertex, neighbors in enumerate(adjacency_list):
        neighbors_str = ', '.join(map(str, neighbors))
        print(f"Sąsiadami wierzchołka {vertex} są: {neighbors_str}")

def list_to_matrix(adjacency_list: List[List[int]]) -> List[List[int]]:
    vertex_count = len(adjacency_list)
    matrix = [[0 for _ in range(vertex_count)] for _ in range(vertex_count)]

    for i, neighbors in enumerate(adjacency_list):
        for neighbor in neighbors:
            matrix[i][neighbor] = 1

    return matrix

def write_matrix(matrix: List[List[int]]) -> None:
    print("Macierz sąsiedztwa:")
    for row in matrix:
        print(' '.join(map(str, row)))

def main() -> None:
    filename = 'graph.txt'
    adjacency_list, vertex_count = read_graph(filename)
    
    print("Lista sąsiedztwa:")
    write_neighbours_list(adjacency_list)
    
    matrix = list_to_matrix(adjacency_list)
    write_matrix(matrix)

if __name__ == '__main__':
    main()
