
let pokemonsHTMLList=document.querySelector(".pokemons");
let paginationItems=document.getElementsByClassName("page");
let selectedPage=document.getElementById("selectedpage");
let selectedShow=document.getElementById("pagenumber");
let paginationList=document.getElementsByClassName("pages").item(0);
let contentDiv=document.querySelector(".content");
let limit=parseInt(document.getElementById("pagenumber").value);
let pageIndex=parseInt(selectedPage.textContent);
let offset=limit*(pageIndex-1);

paginationList.addEventListener("click",(event)=>{
        let clickPage=event.target;
        limit=parseInt(document.getElementById("pagenumber").value);
        if(clickPage.tagName==="LI"){
            if(clickPage.innerText==="<<"){
                pageIndex=1
                for(let i=2;i<7;i++){
                    paginationItems.item(i).innerText=i-1
                }
                selectedPage.removeAttribute("id");
                paginationItems.item(2).id="selectedpage"
                
            }else if(clickPage.innerText===">>"){
                pageIndex=Math.ceil(pokeApi.count/limit)
            
                for(let i=6;i>1;i--){
                    paginationItems.item(i).innerText=pageIndex-6+i

                }
                selectedPage.removeAttribute("id");
                paginationItems.item(6).id="selectedpage"
                
            }else if(clickPage.innerText==="<" && pageIndex>1){
                pageIndex--
                if(parseInt(paginationItems.item(2).innerText)>pageIndex){
                    for(let i=2;i<7;i++){
                        paginationItems.item(i).innerText=pageIndex+i-2
                    }
                    selectedPage.removeAttribute("id");
                    paginationItems.item(2).id="selectedpage"
                    
                }else{
                    for(let i=2;i<7;i++){
                        if(parseInt(paginationItems.item(i).innerText)===pageIndex){
                            selectedPage.removeAttribute("id");
                            paginationItems.item(i).id="selectedpage"
                            break
                        }
                    }
                    
                }   
                
            }else if(clickPage.innerText===">" && pageIndex<Math.ceil(pokeApi.count/limit)){
                pageIndex++
                
                if(parseInt(paginationItems.item(6).innerText)<pageIndex){
                    for(let i=6;i>1;i--){
                        paginationItems.item(i).innerText=pageIndex+i-6
                    }
                    selectedPage.removeAttribute("id");
                    paginationItems.item(6).id="selectedpage"
    
                }else{
                    for(let i=6;i>1;i--){
                        if(parseInt(paginationItems.item(i).innerText)===pageIndex){
                            selectedPage.removeAttribute("id");
                            paginationItems.item(i).id="selectedpage"
                            break
                        }
                    }
                    
                }   
                
            }else{
                pageIndex=parseInt(event.target.innerText);
                        selectedPage.removeAttribute("id");
                        event.target.id="selectedpage";
            }

            
            selectedPage=document.getElementById("selectedpage");
            
            offset=limit*(pageIndex-1);
            if((pageIndex*limit)>pokeApi.count){
                limit=pokeApi.count%limit;
            
            }
            loadPokemonItens(offset,limit)
        }
    })


selectedShow.addEventListener("change", (event)=>{
    limit=parseInt(event.target.value);
    pageIndex=1
    for(let i=2;i<7;i++){
        paginationItems.item(i).innerText=i-1
    }
    selectedPage.removeAttribute("id");
    paginationItems.item(2).id="selectedpage"
    selectedPage=document.getElementById("selectedpage");
    offset=limit*(pageIndex-1);
    if((pageIndex*limit)>pokeApi.count){
        limit=pokeApi.count%limit;
    }
    loadPokemonItens(offset,limit);
});
function convertToCardDiv(pokemon){
    contentDiv.removeChild(pokemonsHTMLList);
    contentDiv.removeChild(document.querySelector("footer"));
    let pokemonNode=document.createElement("li");
    pokemonNode.className="pokemon card";
    let numberSpan=document.createElement("span");
    numberSpan.className="number card";
    numberSpan.textContent=`#${pokemon.number}`;
    let nameSpan=document.createElement("span");
    nameSpan.className="name card";
    nameSpan.textContent=pokemon.name;
    pokemonNode.appendChild(numberSpan);
    pokemonNode.appendChild(nameSpan);
    
    let detailDiv=document.createElement("div");
    detailDiv.className="detail card";
    let typesOl=document.createElement("ol");
    typesOl.className="types card";
    pokemon.types.map((type)=>{
        let typeLi=document.createElement("li")
        typeLi.className="type "+type +" card"
        typeLi.textContent=type
        typesOl.append(typeLi) 
    })
    let statsUl=document.createElement("ul");
    statsUl.className="stats card";
    pokemon.stats.map((stat)=>{
        let statLi=document.createElement("li")
        statLi.className="stat "+stat[0] +" card"
        statLi.textContent=stat[0]+"    " +stat[1]
        statsUl.append(statLi) 
    })

    pokemonNode.className+=" " + typesOl.firstElementChild.textContent;
    detailDiv.appendChild(typesOl);
    
    pokemonNode.appendChild(detailDiv);
    let photoImg=document.createElement("img");
    photoImg.src=pokemon.photo;
    photoImg.alt=pokemon.name;
    detailDiv.appendChild(photoImg);
    pokemonNode.appendChild(statsUl);
    contentDiv.appendChild(pokemonNode);
}

function getCard(clickItem){
    pokeNumber=clickItem.firstElementChild.innerText.slice(1,clickItem.firstElementChild.innerText.length);
    pokeUrl=`https://pokeapi.co/api/v2/pokemon/${pokeNumber}`;
    pokeApi.getPokemonDetails(pokeUrl).then((pokemon)=>convertToCardDiv(pokemon));
}

function convertPokemonToLi(pokemon){
    
    let pokemonNode=document.createElement("li");
    pokemonNode.className="pokemon";
    let numberSpan=document.createElement("span");
    numberSpan.className="number";
    numberSpan.textContent=`#${pokemon.number}`;
    let nameSpan=document.createElement("span");
    nameSpan.className="name";
    nameSpan.textContent=pokemon.name;
    pokemonNode.appendChild(numberSpan);
    pokemonNode.appendChild(nameSpan);
    
    let detailDiv=document.createElement("div");
    detailDiv.className="detail";
    let typesOl=document.createElement("ol");
    typesOl.className="types";
    pokemon.types.map((type)=>{
        let typeLi=document.createElement("li")
        typeLi.className="type "+type
        typeLi.textContent=type
        typesOl.append(typeLi) 
    })
    pokemonNode.addEventListener("click", (e)=>getCard(e.currentTarget));
   
    pokemonNode.className+=" " + typesOl.firstElementChild.textContent;
    detailDiv.appendChild(typesOl);
    pokemonNode.appendChild(detailDiv);
    let photoImg=document.createElement("img");
    photoImg.src=pokemon.photo;
    photoImg.alt=pokemon.name;
    detailDiv.appendChild(photoImg);
    pokemonsHTMLList.appendChild(pokemonNode)
}
function loadPokemonItens(offset,limit) {
    pokemonsHTMLList.innerHTML="";
    pokeApi.getPokemons(offset, limit).then((pokemons)=>pokemons.map(convertPokemonToLi))
}
loadPokemonItens(offset,limit);