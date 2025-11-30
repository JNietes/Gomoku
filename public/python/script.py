import numpy as np
import random

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

class GomokuBoard(object):
  def __init__(self, board):
    self.num_rows = len(board)
    self.num_columns = len(board[0])
    self.current_board = board

  def get_board(self):
    return self.current_board
  
  def set_board(self, board):
    self.current_board = board

  def place_tile(self, color_int, row, col):
    copy = np.array(self.current_board)
    if int(copy[row][col]) == 0:
      copy[row][col] = int(color_int)
      self.current_board = copy.tolist()
    return self.current_board

  def detect_winner(self, color_int, row, col):
    size = self.num_rows
    winner = False
    matching_stones = 0
    for i in range(len(win_matrix)):
      matching_stones = 0
      for j in range(len(win_matrix[0])):
        row_delta = win_matrix[i][j][0]
        col_delta = win_matrix[i][j][1]
        row_plus_delta = int(row) + int(row_delta)
        col_plus_delta = int(col) + int(col_delta)

        if self.new_index_inside(row, row_delta, size) and self.new_index_inside(col, col_delta, size):
          if int(self.current_board[row_plus_delta][col_plus_delta]) == int(color_int):
            matching_stones += 1
          else:
            matching_stones = 0
          
          if matching_stones >= 4:
            winner = True
    return winner

  # Helper for detect_winner
  def new_index_inside(self, index, delta, size):
    inside = False
    new_index = int(index) + int(delta)
    if (new_index >= 0 and new_index < size):
      inside = True
    return inside
