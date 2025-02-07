export default function AddTodoForm() {
  return (
    <form className="border bg-base-200 border-gray-700 shadow-xl rounded-md">
      <div className="flex flex-col gap-4 justify-center items-center p-8 px-12">
        <div className="w-full">
          <label htmlFor="name">Name</label>
          <input
            required
            id="name"
            name="name"
            type="text"
            maxLength={10}
            className="bg-base-200 p-2 pl-4 mt-2 border border-gray-600 rounded-md w-full focus:outline-2 focus:outline-gray-500 focus:-outline-offset-1"
          />
        </div>
        <div className="w-full">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            maxLength={30}
            className="bg-base-200 p-2 pl-4 mt-2 w-full border border-gray-600 focus:outline-2 focus:outline-gray-500 focus:-outline-offset-1 rounded-md"
            defaultValue={""}
          />
        </div>
        <button
          type="submit"
          className="ml-auto rounded-md px-4 py-2 font-semibold border border-gray-600 shadow-xs bg-base-300 hover:bg-gray-500 hover:text-gray-900"
        >
          Add Todo
        </button>
      </div>
    </form>
  );
}
