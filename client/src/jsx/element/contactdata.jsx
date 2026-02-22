const IMAGE_URl = import.meta.env.VITE_API_URL;
function contactdata({ gap, users }) {
  return (
    <>
      <div className="card-body">
        <div className={`row ${gap}`}>
          {users?.data?.users.map((user, i) => (
            <div className="col-xl-4 col-sm-4 col-6" key={i}>
              <div
                className={`avatar-card text-center border-dashed rounded px-2 py-3`}
              >
                <div className="w-[20px] h-[20px]">
                  <img
                    className="w-100 h-100"
                    src={IMAGE_URl + user?.profilePicture}
                    alt={`${i + user?.profilePicture}`}
                  />
                </div>

                <h6 className="mb-0">{user.name}</h6>
                <span className="fs-12">{user.email}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default contactdata;
