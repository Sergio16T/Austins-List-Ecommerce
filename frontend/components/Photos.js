import styled from 'styled-components'; 
import Dropzone from 'react-dropzone'; 

const Photos = styled.div`
    display: grid; 
    grid-template-columns: 1fr 1fr 1fr; 
    grid-gap: 10px; 
    padding: 1.4rem 0; 
    .photoContainer {
        display: flex; 
        justify-content: center; 
        height: 130px; 
        .selectedImageContainer {
            position: relative; 
            #delete_image {
                position: absolute; 
                width: 100%; 
                font-size: 1rem; 
                padding: 8px; 
                bottom: 0; 
                left: 0; 
                background-color: red; 
                color: white; 
                outline: none; 
                border:none; 
                border-radius: 0 0 6px 6px; 
            }
        }
        .image {
            border-radius: 6px 6px 0 0; 
        }
        .empty_photo_container {
            vertical-align: middle;
            text-align: center; 
            width: 150px;
            height: 101px;
            border: 1px solid #d9e4ec;
            border-radius: 4px;
            display: flex; 
            align-items: center; 
            background-color: white; 
            justify-content: center; 
            .image {
                opacity: .2; 
            }
        }
    }
    @media (max-width: 675px) {
        grid-template-columns: 1fr 1fr; 
    }
    @media (max-width: 500px) {
        grid-template-columns: 1fr; 
    }
`; 
const Error = styled.div`
    border: 1px solid red;
    border-left: 5px solid red;
    margin: 1rem 0; 
    padding: 1rem; 
    background-color: rgb(255, 0, 0, .1); 
    position: relative; 
    #drop_errormessage {
      padding-left: 2rem; 
      color: red; 
      font-size: 1.2rem; 
    }
`; 
const UploadPhotosDropNClick = (props) => {
    return (
        <React.Fragment>
            {/* <h2>Item Images</h2> */}
            <Dropzone 
            onDrop={props.dropFile}
            accept="image/*"
            >
                {({ getRootProps, getInputProps }) => (
                    <>
                        {props.fileError ? 
                            <Error>
                                <p id="drop_errormessage">Please only upload images</p>
                            </Error>
                        : null }
                        <section className="dropzone">
                            <div 
                            id="dropInput" 
                            {...getRootProps({
                                onClick: event => event.stopPropagation()
                            })}>
                                <input {...getInputProps()} />
                                <p id="drop_message">Drop files here or click below</p>
                                <label htmlFor="editInput" id="uploadImageLabel"> Upload Image </label>
                            </div>
                        </section>
                    </>
                )}
            </Dropzone>
            <input
            type ="file" 
            accept="image/*"
            id ="editInput" 
            name="file" 
            className="custom-file-input"
            ref={props.inputRef}
            onChange={props.uploadFile}
            />
            {props.largeImage && 
                <PhotosWrapper 
                images={props.image}
                description={props.description}
                deletePhoto={props.deletePhoto}
                />
            }
    </React.Fragment>
    )
}

const PhotosWrapper = (props) => {
    return (
        <Photos>
            {props.images.length ? props.images.map((image,index) => {
                return (
                    <PhotoContainer 
                    key={index} 
                    index={index}
                    image={image} 
                    description={props.description} 
                    deletePhoto={props.deletePhoto}/>
                )
            }) : 
            <React.Fragment>
                <PhotoContainer/>
                <PhotoContainer/>
                <PhotoContainer/>
            </React.Fragment>
            }
            {props.images.length === 1 ? 
            <React.Fragment>
                <PhotoContainer/>
                <PhotoContainer/>
            </React.Fragment> : props.images.length === 2 ? 
            <PhotoContainer/>
            : null
            }
        </Photos>
    )
}

const PhotoContainer = (props) => {
    return (
        <div className="photoContainer">
            <div className="selectedImageContainer">
                {props.image ?
                    <React.Fragment>
                        <img  className="image" width="150" src={props.image} alt={props.description}></img> 
                        <button type="button" id="delete_image" onClick={() => props.deletePhoto(props.index)}>Delete</button>
                    </React.Fragment>
                : 
                <div className="empty_photo_container">
                    <img className="image" width ="80" src="https://res.cloudinary.com/dddnhychw/image/upload/v1588556698/AustinArts%20/upload_photo_icon_ymfjlc.png"/>
                </div>}
            </div>
    </div>
    ); 
}

export { PhotosWrapper, UploadPhotosDropNClick }; 