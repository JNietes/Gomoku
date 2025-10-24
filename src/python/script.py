import numpy as np

def print_matrix(matrix):
  string = ""
  mat = np.array(matrix)
  for row in mat.shape[0]:
    string += "["
    for col in mat.shape[1]:
      string += mat[row][col] + ","
    string += "]"
  return string