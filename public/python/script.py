import numpy as np
import random

# Represents all pieces withing a 4 tile star radius
win_matrix = [
  [[-4, -4], [-3, -3], [-2, -2], [-1, -1], [1, 1], [2, 2], [3, 3], [4, 4]], 
  [[-4, 4], [-3, 3], [-2, 2], [-1, 1], [1, -1], [2, -2], [3, -3], [4, -4]], 
  [[-4, 0], [-3, 0], [-2, 0], [-1, 0], [1, 0], [2, 0], [3, 0], [4, 0]],     
  [[0, -4], [0, -3], [0, -2], [0, -1], [0, 1], [0, 2], [0, 3], [0, 4]]]     

class GomokuBoard(object):
  def __init__(self, size):
    self.size = size
    self.current_board = np.zeros((size, size))
    self.placed_stones = []

  def get_board(self):
    return self.current_board
  
  def set_board(self, board):
    self.current_board = board

  def reset_board(self):
    self.current_board = np.zeros((self.size, self.size))
    self.placed_stones = []

  def print_board(self):
    string = ""
    for row in range(len(self.current_board)):
      string += "["
      for col in range(len(self.current_board[1])):
        string += " " + str(self.current_board[row][col])
        if col != len(self.current_board[1])-1:
          string += ","
      string += "]\n"

    print(string)

  def print_moves(self):
    print(self.placed_stones)

  def place_tile(self, color_int, row, col):
    stone = (color_int, row, col)
    self.placed_stones.append(stone)
    copy = np.array(self.current_board)
    if int(copy[row][col]) == 0:
      copy[row][col] = int(color_int)
      self.current_board = copy.tolist()
    return self.current_board

  def detect_winner(self, color_int, row, col):
    winner = False
    matching_stones = 0
    for i in range(len(win_matrix)):
      matching_stones = 0
      for j in range(len(win_matrix[0])):
        row_delta = win_matrix[i][j][0]
        col_delta = win_matrix[i][j][1]
        row_plus_delta = int(row) + int(row_delta)
        col_plus_delta = int(col) + int(col_delta)

        if self.new_index_inside(row, row_delta, self.size) and self.new_index_inside(col, col_delta, self.size):
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
