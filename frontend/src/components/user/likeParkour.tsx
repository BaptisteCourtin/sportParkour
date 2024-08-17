import {
  useCreateJoinUserParkourFavorisMutation,
  useDeleteJoinUserParkourFavorisMutation,
} from "@/types/graphql";
import toast from "react-hot-toast";

// button pour mettre un like ou de l'enlever
const likeParkour = ({
  isLiked,
  setIsLiked,
  parkourId,
  dataIsClient,
}: {
  isLiked: boolean;
  setIsLiked: any;
  parkourId: string;
  dataIsClient: boolean | undefined;
}) => {
  const [
    createFav,
    { data: dataCreateFav, loading: loadingCreateFav, error: errorCreateFav },
  ] = useCreateJoinUserParkourFavorisMutation();

  const [
    deleteFav,
    { data: dataDeleteFav, loading: loadingDeleteFav, error: errorDeleteFav },
  ] = useDeleteJoinUserParkourFavorisMutation();

  const handleLike = (isFav: boolean): void => {
    if (parkourId) {
      if (isFav) {
        createFav({
          variables: { parkourId: +parkourId },
          onCompleted(data) {
            toast.success(data.createJoinUserParkourFavoris.message);
            setIsLiked(!isLiked);
          },
          onError(error) {
            console.error(error);
          },
        });
      } else {
        deleteFav({
          variables: { parkourId: +parkourId },
          onCompleted(data) {
            toast.success(data.deleteJoinUserParkourFavoris.message);
            setIsLiked(!isLiked);
          },
          onError(error) {
            console.error(error);
          },
        });
      }
    }
  };

  return (
    <div>
      {dataIsClient && isLiked ? (
        <button
          className="fav"
          onClick={() => handleLike(false)}
          disabled={loadingCreateFav || loadingDeleteFav}
        >
          Supprimer des favoris
        </button>
      ) : dataIsClient && !isLiked ? (
        <button
          className="fav"
          onClick={() => handleLike(true)}
          disabled={loadingCreateFav || loadingDeleteFav}
        >
          Mettre en favoris
        </button>
      ) : null}
    </div>
  );
};

export default likeParkour;
