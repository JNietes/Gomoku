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
#current_board.place_stone(1, 6, 8)

# current_board.place_stone(1, 5, 3)
# current_board.place_stone(1, 6, 3)
# current_board.place_stone(1, 7, 3)
# current_board.place_stone(1, 8, 3)

# current_board.place_stone(-1, 0, 0)
# current_board.place_stone(1, 0, 0)
# current_board.place_stone(1, 2, 0)
# current_board.place_stone(1, 3, 0)
# current_board.place_stone(1, 4, 0)

# current_board.place_stone(1, 1, 4)
# current_board.place_stone(1, 2, 5)
# current_board.place_stone(1, 3, 6)
# current_board.place_stone(1, 4, 7)

# current_board.place_stone(1, 1, 12)
# current_board.place_stone(1, 2, 11)
# current_board.place_stone(1, 3, 10)
# current_board.place_stone(1, 4, 9)

temp1 = current_board.copy()
temp2 = current_board.copy()

best_move = current_board.get_best_move(1, 1)
print("depth == 1")
print("((move), board eval, leaves)")
print(best_move)
temp1.place_stone(1, best_move[0][0], best_move[0][1])
temp1.print_board()

best_move = current_board.get_best_move(1, 2)
print("depth == 2")
print("((move), board eval, leaves)")
print(best_move)
temp2.place_stone(1, best_move[0][0], best_move[0][1])
temp2.print_board()

# current_board.place_stone(1, 6, 9)
# print(current_board.detect_winner())

# moves = [successor[0] for successor in current_board.successors(-1)]
# boards = [successor[1] for successor in current_board.successors(-1)]

# for i in range(len(moves)):
#   print(moves[i])
#   boards[i].print_moves()
#   boards[i].print_board()

# current_board.print_moves()

