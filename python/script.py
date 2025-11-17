import numpy as np

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