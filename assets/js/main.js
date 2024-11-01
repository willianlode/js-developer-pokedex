
let pokemonsHTMLList=document.querySelector(".pokemons");
let paginationItems=document.getElementsByClassName("page");
let selectedPage=document.getElementById("selectedpage");
let selectedShow=document.getElementById("pagenumber");
let paginationList=document.getElementsByClassName("pages").item(0);
let contentSection=document.querySelector(".content");
let limit=parseInt(document.getElementById("pagenumber").value);
let pageIndex=parseInt(selectedPage.textContent);
let offset=limit*(pageIndex-1);
let main=document.getElementsByTagName("MAIN").item(0);
let statsInfo;
let statsKeysDiv;
let statsValuesDiv;
let aboutKeysDiv;
let aboutValuesDiv;
let aboutSpan;
let statsSpan;

paginationList.addEventListener("click",(event)=>{
    let clickPage=event.target;
    limit=parseInt(document.getElementById("pagenumber").value);
    if(clickPage.tagName==="LI"){
        if(clickPage.innerText==="<<"){
            if(pageIndex===1){return                    
            }else{
                pageIndex=1;
                for(let i=2;i<7;i++){
                    paginationItems.item(i).innerText=i-1
                }
                selectedPage.removeAttribute("id");
                paginationItems.item(2).id="selectedpage"
            }
            
        }else if(clickPage.innerText===">>"){
            if(pageIndex===Math.ceil(pokeApi.count/limit)){return
            }else{
                pageIndex=Math.ceil(pokeApi.count/limit); 
                for(let i=6;i>1;i--){
                    paginationItems.item(i).innerText=pageIndex-6+i
                }
                selectedPage.removeAttribute("id");
                paginationItems.item(6).id="selectedpage"
            }
            
        }else if(clickPage.innerText==="<" && pageIndex>=1){
            if(pageIndex===1){
                return
            }else{
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
            }
              
            
        }else if(clickPage.innerText===">" && pageIndex<=Math.ceil(pokeApi.count/limit)){
            if(pageIndex===Math.ceil(pokeApi.count/limit)){return
            }else{
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
    //store pokemons and hides paging
    pokemonsHTMLList=contentSection.removeChild(pokemonsHTMLList);
    document.querySelector(".footer").style.display="none";

    let pokemonNode=document.createElement("div"); //card container
    //detail container
    let detailDiv=document.createElement("div");   
    let controlDiv=document.createElement("div");
    let idDiv=document.createElement("div");
    let imgDiv=document.createElement("div");
    let nameSpan=document.createElement("span");
    let numberSpan=document.createElement("span");
    let typesOl=document.createElement("ol");
    let photoImg=document.createElement("img");
    //Stats container
    let statsDiv=document.createElement("div"); //stats card
    let statsMenu=document.createElement("div"); //stats menu container
    aboutSpan=document.createElement("span");
    statsSpan=document.createElement("span");
    statsSpan.addEventListener("click",(e)=>insertCardInfo(e))
    statsInfo=document.createElement("div"); //info card container
    statsKeysDiv=document.createElement("div");
    statsValuesDiv=document.createElement("div");
    aboutKeysDiv=document.createElement("div");
    aboutValuesDiv=document.createElement("div");
    
    pokemonNode.className="pokemon card";
    detailDiv.className="detail card";
    controlDiv.className="control card";
    idDiv.className="id-container";
    numberSpan.className="number card";
    nameSpan.className="name card";
    typesOl.className="types card";
    statsDiv.className="stats card";
    statsMenu.className="menu card";
    statsInfo.className="info card";
    aboutSpan.className="selected";
    aboutSpan.id="about-card";
    statsSpan.id="base-stats";

    controlDiv.textContent="⬅";
    numberSpan.textContent=`#${pokemon.number}`;
    nameSpan.textContent=pokemon.name;
    photoImg.src=pokemon.photo;
    photoImg.alt=pokemon.name;
    controlDiv.addEventListener("click", ()=>returnPage())

    aboutSpan.textContent="About";
    statsSpan.textContent="Base Stats";

    pokemon.types.map((type)=>{
        let typeLi=document.createElement("li")
        typeLi.className="type "+type +" card"
        typeLi.textContent=type
        typesOl.append(typeLi) 
    })
    
    pokemon.stats.map((stat)=>{
        let keyP=document.createElement("p")
        let valueP=document.createElement("p");
        keyP.className="stats key card";
        valueP.className="stats value card";
        keyP.textContent=stat[0]
        valueP.textContent=stat[1]
        statsKeysDiv.append(keyP)
        statsValuesDiv.append(valueP) 
    })
    let heightKey=document.createElement("p")
    heightKey.className="about key card"
    let weightKey=document.createElement("p")
    weightKey.className="about key card";
    let abilitiesKey=document.createElement("p")
    abilitiesKey.className="about key card";
    let heightValue=document.createElement("p")
    heightValue.className="about value card";
    let weightValue=document.createElement("p")
    weightValue.className="about value card";;
    let abilitiesValue=document.createElement("p")
    abilitiesValue.className="about value card";;
    heightKey.textContent="Height"
    weightKey.textContent="Weight"
    abilitiesKey.textContent="Abilities"
    heightValue.textContent=pokemon.height
    weightValue.textContent=pokemon.weight
    abilitiesValue.textContent=pokemon.abilities.map((ability)=>ability).join(", ")
    aboutKeysDiv.append(heightKey)
    aboutKeysDiv.append(weightKey)
    aboutKeysDiv.append(abilitiesKey)
    aboutValuesDiv.append(heightValue)
    aboutValuesDiv.append(weightValue)
    aboutValuesDiv.append(abilitiesValue)

    pokemonNode.className+=" " + typesOl.firstElementChild.textContent;
    
    //pokemonNode.appendChild(numberSpan);
    //pokemonNode.appendChild(nameSpan);
    
    idDiv.appendChild(nameSpan);
    idDiv.appendChild(numberSpan);
    detailDiv.appendChild(controlDiv);
    detailDiv.appendChild(idDiv);
    detailDiv.appendChild(typesOl); 
    detailDiv.appendChild(photoImg);
    statsMenu.appendChild(aboutSpan);
    statsMenu.appendChild(statsSpan);
    statsDiv.appendChild(statsMenu);
    statsDiv.appendChild(statsInfo);
    statsInfo.appendChild(aboutKeysDiv);
    statsInfo.appendChild(aboutValuesDiv);
    pokemonNode.appendChild(detailDiv);
    pokemonNode.appendChild(statsDiv);
    contentSection.appendChild(pokemonNode);
}
function insertCardInfo(e){
    let getTargetId=e.target.id
    if(getTargetId==="about-card"){
        statsKeysDiv=statsInfo.removeChild(statsKeysDiv)
        statsValuesDiv=statsInfo.removeChild(statsValuesDiv)
        statsInfo.appendChild(aboutKeysDiv);
        statsInfo.appendChild(aboutValuesDiv);
        statsSpan.removeAttribute("class");
        e.target.nextSibling.addEventListener("click",(e)=>insertCardInfo(e))
        
    }else if(getTargetId==="base-stats"){
        aboutKeysDiv=statsInfo.removeChild(aboutKeysDiv)
        aboutValuesDiv=statsInfo.removeChild(aboutValuesDiv)
        statsInfo.appendChild(statsKeysDiv);
        statsInfo.appendChild(statsValuesDiv);
        aboutSpan.removeAttribute("class")
        e.target.previousSibling.addEventListener("click",(e)=>insertCardInfo(e))
    }
    
    e.target.className="selected"
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
function returnPage(){
    contentSection.lastChild.remove()
    contentSection.append(pokemonsHTMLList)
    loadPokemonItens(offset,limit)
    document.querySelector(".footer").style.display="flex";
}
function loadPokemonItens(offset,limit) {
    pokemonsHTMLList.innerHTML="";
    document.querySelector(".footer").style.display="flex";
    pokeApi.getPokemons(offset, limit).then((pokemons)=>pokemons.map(convertPokemonToLi))
}
loadPokemonItens(offset,limit);