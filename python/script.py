import numpy as np

# Represents all pieces withing a 4 tile star radius
win_matrix = [
  [[-4, -4], [-3, -3], [-2, -2], [-1, -1], [1, 1], [2, 2], [3, 3], [4, 4]], 
  [[-4, 4], [-3, 3], [-2, 2], [-1, 1], [1, -1], [2, -2], [3, -3], [4, -4]], 
  [[-4, 0], [-3, 0], [-2, 0], [-1, 0], [1, 0], [2, 0], [3, 0], [4, 0]],     
  [[0, -4], [0, -3], [0, -2], [0, -1], [0, 1], [0, 2], [0, 3], [0, 4]]]     

def print_matrix(matrix):
  string = ""
  mat = np.array(matrix)
  for row in range(mat.shape[0]):
    string += "["
    for col in range(mat.shape[1]):
      string += " " + str(mat[row][col])
      if col != mat.shape[1]-1:
        string += ","
    string += "]\n"
  return string

def place_tile(color_int, matrix, row, col):
  copy = np.array(matrix)
  if (matrix[row][col] == 0): 
    copy[row][col] = color_int
  return copy.tolist()

def detect_winner(color_int, matrix, row, col):
  size = len(matrix)
  winner = False
  matching_stones = 0
  for i in range(len(win_matrix)):
    matching_stones = 0
    for j in range(len(win_matrix[0])):
      row_delta = win_matrix[i][j][0]
      col_delta = win_matrix[i][j][1]
      row_plus_delta = int(row) + int(row_delta)
      col_plus_delta = int(col) + int(col_delta)

      if new_index_inside(row, row_delta, size) and new_index_inside(col, col_delta, size):
        if int(matrix[row_plus_delta][col_plus_delta]) == int(color_int):
          matching_stones += 1
        else:
          matching_stones = 0
        
        if matching_stones >= 4:
          winner = True
  return winner

# Helper for detect_winner
def new_index_inside(index, delta, size):
  inside = False
  new_index = int(index) + int(delta)
  if (new_index >= 0 and new_index < size):
    inside = True
  return inside
