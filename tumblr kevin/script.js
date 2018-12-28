let Key = "uio7eKsnYs3kMCTjds9X08ODpl2eNih5un5ZaCf582hXW2BVkV"
let URL = "https://api.tumblr.com/v2/"
const tags = ['Cat','Dog','Chicken','Fish', 'Monkey', 'Cheese']
let answer = "";
const list = document.getElementById('list-data')
const answerList = document.getElementById('choices')

function reset(){
    
    
    answerList.innerHTML = "";
    answer = tags[Math.floor(Math.random() * tags.length)];
    getTaggedPhotos(answer);

    const choices = [];
    choices.push(answer);

    while(choices.length < 4){
        const rand = tags[Math.floor(Math.random() * tags.length)]
        if (choices.indexOf(rand) == -1){
            choices.push(rand);
        }
    }

    choices.sort(function(){
        return Math.random() * 2 - 1;
    })

    for (let i = 0; i < choices.length; i++){
        const li = document.createElement('li');
        const btn = document.createElement('button')
        li.appendChild(btn);
        btn.innerHTML = choices[i];
        btn.onclick = function (){
            
            if (btn.innerHTML == answer){
                window.alert('You are correct')
            }
            else {
                window.alert('Sorry, but the awnser was ' + answer + '. Better luck next time')
            }

            reset();
        }
        answerList.appendChild(li);
    }
}

function getTaggedPhotos(tagName){

    fetch(URL+"tagged?tag="+tagName+"&api_key="+Key)
        .then(function(response){
            return response.json(); 

        }).then(function(result){
            if(!result){
                return;
            }
            
            list.innerHTML='';

            const items = result.response;

            for (let i = 0; i < items.length; i++){
                const item=items[i];

                if (item.photos != undefined){
                    const altSizes = item.photos[0].alt_sizes;
                    const imgSrc = altSizes[altSizes.length - 2].url;

                    const img = document.createElement('img');
                    img.src = imgSrc;

                    const li = document.createElement('li');
                    
                    li.appendChild(img);
                    list.appendChild(li);
                    
                }
            }
        })
        .catch(function(err){
            window.alert('Sorry, but it seems tht the API is down. Please try again later')
            console.log('messages:', err)
        })
        

}

reset()