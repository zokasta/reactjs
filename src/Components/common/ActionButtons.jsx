import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
export default function ActionButtons({ onEdit, onDelete }) {
  return (
    <div className="flex gap-3 justify-center">
      {onEdit && (
        <button
          onClick={onEdit}
          className="text-yellow-400 hover:text-yellow-500 transition"
        >
          <CreateIcon size={18} />
        </button>
      )}
      {onDelete && (
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-600 transition"
        >
          <DeleteIcon/>
        </button>
      )}
    </div>
  );
}
