import numpy as np
import random
import copy
import math

# Represents all pieces withing a 4 tile star radius
win_matrix = [
  [[-4, -4], [-3, -3], [-2, -2], [-1, -1], [1, 1], [2, 2], [3, 3], [4, 4]], 
  [[-4, 4], [-3, 3], [-2, 2], [-1, 1], [1, -1], [2, -2], [3, -3], [4, -4]], 
  [[-4, 0], [-3, 0], [-2, 0], [-1, 0], [1, 0], [2, 0], [3, 0], [4, 0]],     
  [[0, -4], [0, -3], [0, -2], [0, -1], [0, 1], [0, 2], [0, 3], [0, 4]]]     

black_patterns = [
  (1000, np.array([-1, -1, -1, -1, -1])),
  (500, np.array([0, -1, -1, -1, -1, 0])),
  (20, np.array([1, -1, -1, -1, -1, 0])),
  (10, np.array([0, 0, -1, -1, -1, 0, 0])),
  (5,  np.array([1, 0, -1, -1, -1, 0, 0])),
  (5,  np.array([0, 0, -1, -1, -1, 0, 1])),
  (5,  np.array([0, -1, 0, -1, -1, 0])),
  (5,  np.array([0, -1, -1, 0, -1, 0])),
  (2,  np.array([0, -1, -1, 0]))
]

white_patterns = [
  (1000, np.array([1, 1, 1, 1, 1])),
  (500, np.array([0, 1, 1, 1, 1, 0])),
  (20, np.array([-1, 1, 1, 1, 1, 0])),
  (10, np.array([0, 0, 1, 1, 1, 0, 0])),
  (5,  np.array([-1, 0, 1, 1, 1, 0, 0])),
  (5,  np.array([0, 0, 1, 1, 1, 0, -1])),
  (5,  np.array([0, 1, 0, 1, 1, 0])),
  (5,  np.array([0, 1, 1, 0, 1, 0])),
  (2,  np.array([0, 1, 1, 0]))
]

class GomokuBoard(object):
  def __init__(self, size):
    self.size = size
    self.current_board = np.zeros((size, size))
    self.placed_stones = []

  def copy(self):
    new_game = GomokuBoard(self.size)
    new_game.set_board(copy.deepcopy(self.current_board))
    new_game.set_placed_stones(copy.deepcopy(self.placed_stones))
    return new_game

  def get_board(self):
    return self.current_board
  
  def set_board(self, board):
    self.current_board = board

  def get_placed_stones(self):
    return self.placed_stones
  
  def set_placed_stones(self, list):
    self.placed_stones = list

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
    print(f"Stones Placed: {self.placed_stones}")

  def is_legal_move(self, row, col):
    if row < 0 or col < 0 or row > self.size-1 or col > self.size-1:
      return False
    if self.current_board[row][col] != 0:
      return False
    return True
    
  def place_stone(self, color_int, row, col):
    stone = (color_int, row, col)
    self.placed_stones.append(stone)
    copy = np.array(self.current_board)
    if int(copy[row][col]) == 0:
      copy[row][col] = int(color_int)
      self.current_board = copy.tolist()

    return self.current_board
    
  def place_stone_randomly(self, color_int):
    row, col = random.randint(0, self.size-1), random.randint(0, self.size-1)
    while self.current_board[row][col] != 0:
      row, col = random.randint(0, self.size-1), random.randint(0, self.size-1)
    return self.place_stone(color_int, row, col)
  
  def place_stone_within_successor(self, color_int):
    index = random.choice(self.successor_indexes())
    return self.place_stone(color_int, index[0], index[1])
  
  def place_best_move(self, color_int):
    best_move = self.get_best_move(color_int, 2)
    print(f"Board value for {color_int}: {self.get_board_value(color_int)}")
    return self.place_stone(color_int, best_move[0][0], best_move[0][1])

  def detect_winner(self):
    last_stone = self.placed_stones[-1]

    color_int, row, col = last_stone
    winner = False
    matching_stones = 0
    for i in range(len(win_matrix)):
      matching_stones = 0
      for j in range(len(win_matrix[0])):
        row_delta = win_matrix[i][j][0]
        col_delta = win_matrix[i][j][1]
        row_plus_delta = int(row) + int(row_delta)
        col_plus_delta = int(col) + int(col_delta)

        if self.delta_index_inside(row_plus_delta, self.size) and self.delta_index_inside(col_plus_delta, self.size):
          if int(self.current_board[row_plus_delta][col_plus_delta]) == int(color_int):
            matching_stones += 1
          else:
            matching_stones = 0
          
          if matching_stones >= 4:
            winner = True
    return winner

  # Helper for detect_winner. Modified is_legal_move
  def delta_index_inside(self, delta_index, size):
    if (delta_index < 0 or delta_index > size-1):
      return False
    return True

  def successor_indexes(self):
    all_stone_indices = [stone_indices[1:] for stone_indices in self.placed_stones]

    radius = 1
    original_sub_indices = []
    for stone_index in all_stone_indices:

      # Use min and max to ensure indexes are within size
      row_start = max((stone_index[0]-radius), 0)
      row_end = min((stone_index[0]+radius+1), self.size)
      col_start = max((stone_index[1]-radius), 0)
      col_end = min((stone_index[1]+radius+1), self.size)

      original_row_indices = np.arange(row_start, row_end).tolist()
      original_col_indices = np.arange(col_start, col_end).tolist()
      
      for row_index in original_row_indices:
        for col_index in original_col_indices:

          if self.current_board[row_index][col_index] == 0:
            index = (row_index, col_index)
            original_sub_indices.append(index)
          
    original_sub_indices = set(original_sub_indices)

    return list(original_sub_indices)
  
  def successors(self, color_int):
    for move in self.successor_indexes():
      new_board = self.copy()
      new_board.place_stone(color_int, move[0], move[1])
      yield move, new_board

  def evaluate_patterns(self, patterns):
    board_value = 0
    temp = np.array(self.current_board)
    for value, pattern in patterns:

      # Checks for pattern horizontally
      for row in range(len(self.current_board)):
        start_index = 0
      
        while start_index <= self.size-len(pattern):
          sub_list = temp[row, start_index: start_index + len(pattern)]

          if (pattern == sub_list).all():
            board_value += value

          start_index+=1

      # Checks for pattern vertially
      
      for col in range(len(self.current_board[0])):
        
        start_index = 0
        while start_index <= self.size-len(pattern):
          sub_list = temp[start_index: start_index + len(pattern), col]

          if (pattern == sub_list).all():
            board_value += value

          start_index+=1

      # Checks for pattern in main diagonal
      rows, cols = self.size, self.size
      for i in range(-(rows - 1), cols):
        diagonal = temp.diagonal(offset=i)
        
        start_index = 0
        while start_index <= len(diagonal) - len(pattern):
          sub_list = diagonal[start_index: start_index + len(pattern)]

          if len(sub_list) >= len(pattern) and (pattern == sub_list).all():
            board_value += value

          start_index+=1

      # Checks for pattern in anti diagonal
      flipped_board = np.flipud(temp)
      for i in range(-(rows - 1), cols):
        anti_diagonal = flipped_board.diagonal(offset=i)
        
        start_index = 0
        while start_index <= len(anti_diagonal) - len(pattern):
          sub_list = anti_diagonal[start_index: start_index + len(pattern)]

          if (pattern == sub_list).all():
            board_value += value

          start_index+=1

    return board_value

  def get_board_value(self, color_int):
    if color_int == -1:
      player_eval = self.evaluate_patterns(black_patterns)
      opponent_eval = self.evaluate_patterns(white_patterns)
      
    else:
      player_eval = self.evaluate_patterns(white_patterns)
      opponent_eval = self.evaluate_patterns(black_patterns)
      # if player_eval == 500:
      #   print("player evall == 500")

    return player_eval-opponent_eval
  
  def get_best_move(self, color_int, limit):
    alpha = -math.inf
    beta = math.inf
    return self.max_value(color_int, limit, alpha, beta)

  def max_value(self, color_int, d, alpha, beta):
    if d == 0 or self.detect_winner():
      return None, self.get_board_value(color_int), 1

    best_move = None
    best_val = -math.inf
    total_leaves = 0

    for move, child in self.successors(color_int):
      _, eval, leaves = child.min_value(color_int, d - 1, alpha, beta)
      total_leaves += leaves

      if eval > best_val:
        best_val, best_move = eval, move
      alpha = max(alpha, eval)

      if beta <= alpha:
        break

    return best_move, best_val, total_leaves

  def min_value(self, color_int, d, alpha, beta):
    if d == 0 or self.detect_winner():
      return None, self.get_board_value(color_int), 1

    best_move = None
    best_val = math.inf
    total_leaves = 0

    for move, child in self.successors(-color_int):
      _, eval, leaves = child.max_value(color_int, d - 1, alpha, beta)
      total_leaves += leaves

      if eval < best_val:
        best_val, best_move = eval, move
      beta = min(beta, eval)

      if beta <= alpha:
        break

    return best_move, best_val, total_leaves