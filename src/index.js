const imageContainer = document.querySelector('.image-container')
const cardImgEl = document.querySelector('.image-card')


const state = {
    images: []
}

function getImagesFromServer(){
   return fetch("http://localhost:3000/images")
   .then(function(resp){
     return resp.json()
    })
    // .then(function(images){
    //     console.log(images)
    // })
}



    function createCommentOnServer(imageId, content) {
        return fetch("http://localhost:3000/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                imageId: imageId,
                content: content
            })
        }).then(function (resp) {
            return resp.json();
        });
    }


function renderImgaContainer(){
    imageContainer.innerHTML = ''
    for (const container of state.images){
    const articleEl = document.createElement('article')
    articleEl.setAttribute('class', 'image-card')

    const h2TextEl = document.createElement('h2')
    h2TextEl.textContent = container.title

    const imageEl = document.createElement('img')
    imageEl.setAttribute('class', 'image')
    imageEl.setAttribute('src', container.image)

    const likesDivEl = document.createElement('div')
    likesDivEl.setAttribute ('class', 'likes-section')

    const spanEL = document.createElement('span')
    spanEL.setAttribute('class', 'likes')
    spanEL.textContent = container.likes

    const LikeBtnEl = document.createElement('button')
    LikeBtnEl.setAttribute('class', 'like-button')
    LikeBtnEl.textContent = '♥'
    LikeBtnEl.addEventListener('click', function(){
        container.likes++ 
    })

    const comentUlEl = document.createElement('ul')
    comentUlEl.setAttribute('class', 'comments')
    for (const comment of container.comments){
        const comentLiEl = document.createElement('li')
        comentLiEl.textContent = comment.content
        comentUlEl.append(comentLiEl)
    }

    const commentFormSection = document.createElement('form')
    commentFormSection.setAttribute('class', 'comment-form')
   

    const comentInputEl = document.createElement('input')
    comentInputEl.setAttribute('class', 'comment-input')
    comentInputEl.setAttribute('type', 'text')
    comentInputEl.setAttribute('name', 'comment')
    comentInputEl.setAttribute('placeholder', 'Add a comment')

    const cometBtnPost = document.createElement('button')
    cometBtnPost.setAttribute('class','comment-button')
    cometBtnPost.setAttribute('type','submit')
    cometBtnPost.textContent = 'Post'


    commentFormSection.addEventListener('submit' ,function(event){
        event.preventDefault()

        const content = commentFormSection.comment.value
        createCommentOnServer(container.id, content).then(
            function(commentsFromServer){
                container.comments.push(commentsFromServer)
                render()
                commentFormSection.reset()
            })
    })
          
    likesDivEl.append(spanEL, LikeBtnEl)
    commentFormSection.append(comentInputEl, cometBtnPost)
    articleEl.append(h2TextEl, imageEl, likesDivEl, comentUlEl, commentFormSection)
    imageContainer.append(articleEl)


}
}


function render(){
    renderImgaContainer()
}

getImagesFromServer().then(function(imageDataFromServer){
    state.images = imageDataFromServer
    render()
})

render()