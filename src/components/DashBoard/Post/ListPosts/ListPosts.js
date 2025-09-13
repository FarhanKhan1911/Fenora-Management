import "./ListPosts.scss";

const ListPosts = ({ items, onEdit }) => {
  return (
    <div className='list-view'>
      {items.map((item, index) => (
        <div key={index} className='list-item'>
          {item.mediaURL ? (
            item.mediaFile?.type?.startsWith("video") || item.mediaURL.endsWith(".mp4") ? (
              <video controls src={item.mediaURL}></video>
            ) : (
              <img src={item.mediaURL} alt={item.title} />
            )
          ) : (
            <p>No media</p>
          )}

          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p>
            <strong>Price:</strong> Rs.{item.price}
          </p>
          <button onClick={() => onEdit(item, index)}>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default ListPosts;
