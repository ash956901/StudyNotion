import random

def determine_winner(player_choice, computer_choice):
    if player_choice == computer_choice:
        return "It's a tie!"
    elif (player_choice == 'rock' and computer_choice == 'scissors') or \
         (player_choice == 'paper' and computer_choice == 'rock') or \
         (player_choice == 'scissors' and computer_choice == 'paper'):
        return "You win!"
    else:
        return "Computer wins!"

def main():
    choices = ['rock', 'paper', 'scissors']
    
    print("Welcome to Rock-Paper-Scissors game!")
    print("Enter your choice: rock, paper, or scissors. To quit, enter 'q'.")
    
    while True:
        player_choice = input("Your choice: ").lower()
        
        if player_choice == 'q':
            print("Thanks for playing!")
            break
        
        if player_choice not in choices:
            print("Invalid choice. Please enter 'rock', 'paper', or 'scissors'.")
            continue
        
        computer_choice = random.choice(choices)
        print(f"Computer's choice: {computer_choice}")
        
        result = determine_winner(player_choice, computer_choice)
        print(result)
        print()

if __name__ == "__main__":
    main()
