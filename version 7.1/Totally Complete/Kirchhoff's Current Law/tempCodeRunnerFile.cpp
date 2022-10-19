#include <iostream>
#include <string.h>

using namespace std;

int main(){
    string code;
    cin>>code;
    for(int i=0; i<code.length(); i++){
        // cout<<code[i];
        if(i%8 == 0){
            cout<<" ";
        }
        if(code[i] == '='){
            cout<<0;
        }
        else if(code[i] =='r'){
            cout<<1;
        }
    }
    return 0;
}