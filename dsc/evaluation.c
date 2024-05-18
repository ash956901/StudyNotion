#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX 100

typedef enum{lparen,rparen,plus,minus,times,divide,mod,eos,operand} precedence;
int stack[MAX];
int top=-1;
char EXPR[MAX];


void push(int val){
  stack[++top]=val;
}

int pop(){
  return stack[top--];
}
precedence get_token(char *s,int *n){
  *s=EXPR[(*n)++];
  switch(*s){
    case '(':return lparen;
    case ')':return rparen;
    case '+':return plus;
    case '-':return minus;
    case '*':return times;
    case '/':return divide;
    case '%':return mod;
    case '\0':return eos;
    default: return operand;
  }
}


int eval(){
  char s;
  int n=0;
  precedence token;
  token=get_token(&s,&n);
  while(token!=eos){
    if(token==operand){
      push(s-'0');
    }
    else{
      int op2=pop();
      int op1=pop();
      switch(token){
        case plus:push(op1+op2); break;
        case minus:push(op1-op2); break;
        case times:push(op1*op2); break;
        case divide:
          if(op2==0){
            printf("Divide by zero error");
            return -1;
          }
          push(op1+op2); 
          break;
        case mod:
          if(op2==0){
            printf("Divide by zero error");
            return -1;
          }
          push(op1+op2);
           break;
      }
    }

    token=get_token(&s,&n);
  }

  return pop();
}


int main(){
  printf("Enter the postfix expression:");
  scanf("%s",&EXPR);
  printf("EVALUATION:%d",eval());
  return 0;
}
