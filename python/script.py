import numpy as np

# Represents all pieces withing a 4 tile star radius.
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

def detect_winner(matrix):
  winner = "N/A"
  return winner

