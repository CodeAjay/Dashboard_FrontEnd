import { useContext, useEffect, useState } from "react"
import { DataContext } from "../../Store/store"

function StPastPayments() {
  const { studentId, token } = useContext(DataContext)
  const [payment, setPayment] = useState([])
  useEffect(() => {

    const payments = async () => {
      const pastPayments = await fetch(`http://localhost:3000/api/student/${studentId}/past-payments`,{
        headers: {
          'Content-Type': 'application/json', // Set content type
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        },
      })
      const paymentsData = await pastPayments.json()
      setPayment(paymentsData)
    }
    payments()

  }, [studentId])

  return (
    <>
      <div className="grid grid-cols-3 gap-4 container">

        {payment.map((items, index) => {

          return (

            <div key={index} className="bg-white rounded-lg shadow-md p-6 col-span-1">
              <div className="mb-4 flex justify-between items-center">
                <p className="text-gray-600 font-medium">Last Payment</p>
                <p className="text-gray-800 font-bold text-[16px]">{items.paymentDate}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-600 font-medium">Amount</p>
                <div className="flex items-center">
                  <span className="text-gray-800 font-bold text-lg">₹{items.amountPaid}</span>
                  <span className="bg-green-400 text-white font-bold text-[12px] rounded-full px-[16px] py-[3px] ml-2">
                    Paid
                  </span>
                </div>
              </div>
            </div>

          )
        })}

      </div>
    </>
  )
}

export default StPastPayments