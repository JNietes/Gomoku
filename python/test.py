import script

board = [
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

current_board = script.GomokuBoard(15)

# current_board.place_tile(-1, 7, 7)
# current_board.place_tile(1, 7, 8)

current_board.set_board(board)

current_board.place_stone(1, 6, 5)
current_board.place_stone(1, 6, 6)
current_board.place_stone(1, 6, 7)
current_board.place_stone(1, 6, 8)

current_board.place_stone(1, 5, 3)
current_board.place_stone(1, 6, 3)
current_board.place_stone(1, 7, 3)
current_board.place_stone(1, 8, 3)

current_board.place_stone(-1, 0, 0)
current_board.place_stone(1, 0, 0)
current_board.place_stone(1, 2, 0)
current_board.place_stone(1, 3, 0)
current_board.place_stone(1, 4, 0)

current_board.place_stone(1, 1, 4)
current_board.place_stone(1, 2, 5)
current_board.place_stone(1, 3, 6)
current_board.place_stone(1, 4, 7)

current_board.place_stone(1, 1, 12)
current_board.place_stone(1, 2, 11)
current_board.place_stone(1, 3, 10)
current_board.place_stone(1, 4, 9)

# current_board.place_stone(1, 6, 9)
print(current_board.detect_winner())

# moves = [successor[0] for successor in current_board.successors(-1)]
# boards = [successor[1] for successor in current_board.successors(-1)]

# for i in range(len(moves)):
#   print(moves[i])
#   boards[i].print_moves()
#   boards[i].print_board()

current_board.print_moves()
current_board.print_board()
print(current_board.get_board_value(1))