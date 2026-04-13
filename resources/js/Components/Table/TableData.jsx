
function TableData({children, className = "", ...props}) {
  return (
    <td {...props} className={"px-4 py-3 dark:text-gray-100 " + className}>
        {children}
    </td>   
  )
}

export default TableData