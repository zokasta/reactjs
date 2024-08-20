import Table from "./Table";

export default function ExampleTable() {
  const format = [
    { id: 1, title: "id", target: "id",spacial: false },
    { id: 2, title: "name", target: "name",spacial: false },
    { id: 3, title: "type", target: "type",spacial: false },
    { id: 4, title: "salary", target: "salary",spacial: false },
    { id: 5, title: "Status", target: "status",spacial: false },
    { id: 6, title: "Action", target: "action",spacial: true },
  ];

  const data = [
    {id:1, name:"faiz",type:"admin",salary:40000,status:"active"},
    {id:2, name:"faiz",type:"admin",salary:40000,status:"active"},
    {id:3, name:"faiz",type:"admin",salary:40000,status:"active"},
    {id:4, name:"faiz",type:"admin",salary:40000,status:"active"},
    {id:5, name:"faiz",type:"admin",salary:40000,status:"active"},
    {id:6, name:"faiz",type:"admin",salary:40000,status:"active"},
    {id:7, name:"faiz",type:"admin",salary:40000,status:"active"},
  ]
  return (
    <Table
      data={data}
      format={format}
    >
      <thead className="text-xs text-gray-100 uppercase bg-orange-500">
        <tr>
          {format.length !== 0 &&
            format.map((data) => (
              <th
                key={data.id}
                scope="col"
                colSpan={1}
                className="duration-300 pl-2 sm:pl-1 py-2 group h-14 min-w-[75px]"
              >
                {data.title}
              </th>
            ))}
        </tr>
      </thead>

      <tbody>
        {data.length === 0 && (
          <tr>
            <td
              colSpan={format.length}
              className="text-center text-bold text-xl text-gray-800 uppercase py-4 border-[1.5px] border-gray-300"
            >
              Data not found
            </td>
          </tr>
        )}
        {data.length !== 0 &&
          data.map((list) => (
            <tr
              // className={`pl-2 ${ list.status === "debit"?"bg-[#ffdddd] hover:bg-[#ffb0b0]":"bg-[#c2ecff] hover:bg-[#95deff]"} text-slate-900 border-y-[1.7px]`}
              className={`pl-2 text-slate-900 border-y-[1.7px] hover:bg-[#f1f1f1]`}
              key={list.id}
            >
              {format.map((data, index) => (
                <>
                  {!data.spacial && (
                    <th
                      className="px-4 py-4 md:px-4 sm:px-2 font-medium"
                      scope="row"
                      key={index}
                    >
                      {list[data.target]}
                    </th>
                  )}
                </>
              ))}
              <th
                className="px-4 py-4 md:px-4 sm:px-2 font-medium flex flex-row gap-1"
                scope="row"
              >
                {/* <EditPopup
                  route={`admin/user/` + list.id + "/"}
                  title="Edit User"
                  onLoading={() => setLoading(!loading)}
                  format={editFormat}
                  data={list}
                  alert="User has been updated"
                />
                <DeletePopup
                  id={list.id}
                  route="users/delete/"
                  onLoading={() => setLoading(!loading)}
                /> */}
              </th>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}
