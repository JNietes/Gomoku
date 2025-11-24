import script

# These are set to the coordinates of a tile that is clicked
row = 7
col = 8

color_int = -1

# Represents all pieces withing a 4 tile star radius
win_matrix = [
  [[-4, -4], [-3, -3], [-2, -2], [-1, -1], [1, 1], [2, 2], [3, 3], [4, 4]], 
  [[-4, 4], [-3, 3], [-2, 2], [-1, 1], [1, -1], [2, -2], [3, -3], [4, -4]], 
  [[-4, 0], [-3, 0], [-2, 0], [-1, 0], [1, 0], [2, 0], [3, 0], [4, 0]],     
  [[0, -4], [0, -3], [0, -2], [0, -1], [0, 1], [0, 2], [0, 3], [0, 4]]]     

board = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,-1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,-1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]

def detect_winner(matrix):
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
        print("row: " + str(i) + " " + str(matrix[row_plus_delta][col_plus_delta]))
        print(int(color_int))
        if int(matrix[row_plus_delta][col_plus_delta]) == int(color_int):
          matching_stones += 1
          print(matching_stones)
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

print(detect_winner(board))