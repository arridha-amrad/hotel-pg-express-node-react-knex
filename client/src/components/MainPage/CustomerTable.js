import React, { useContext, useEffect } from "react";
import CustomerContext from "../../context/customer/CustomerContext";
import _ from "lodash";
import Moment from "react-moment";
import ModalCheckout from "../utils/ModalCheckout";
import authContext from "../../context/auth/authContext";

const CustomerTable = () => {
  const { customer, loadCustomer } = useContext(CustomerContext);
  const { user } = useContext(authContext);
  useEffect(() => {
    loadCustomer();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div className="table-area">
        <div className="myTable">
          <table>
            <thead className="table-header">
              <tr>
                <th>Nama</th>
                <th>Asal</th>
                <th>No.ID</th>
                <th>Identitas</th>
                <th>Checkin</th>
                {user && user.role === "manager" && <th>CI_R</th>}
                <th>Checkout</th>
                {user && user.role === "manager" && <th>CO_R</th>}
                <th>Durasi</th>
                {user && user.role === "manager" && <th>Credit</th>}
              </tr>
            </thead>
            <tbody>
              {_.map(customer, c => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.asal}</td>
                  <td>{c.noid}</td>
                  <td>{c.identitas}</td>
                  <td>
                    <Moment format="YYYY-MM-DD hh:mm">{c.checkin}</Moment>
                  </td>
                  {user && user.role === "manager" && (
                    <td>{c.ci_receptionist}</td>
                  )}
                  {c.checkout === null ? (
                    <td>
                      <ModalCheckout customer={c} />
                    </td>
                  ) : (
                    <td>
                      <Moment format="YYYY-MM-DD HH:mm">{c.checkout}</Moment>
                    </td>
                  )}
                  {user && user.role === "manager" && (
                    <td>{c.co_receptionist}</td>
                  )}
                  <td>{c.durasi}</td>
                  {user && user.role === "manager" && <td>{c.credit}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerTable;
