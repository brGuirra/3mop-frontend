export const ContactsList = () => {
  return (
    <main>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Celular</th>
              <th>Endereço</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Bruno Guirra</td>
              <td>
                <a
                  href="mailto:br.guirra@email.com"
                  target="_blank"
                  className="link"
                >
                  br.guirra@email.com
                </a>
              </td>
              <td>
                <a href="tel:16992186636" className="link">
                  16 99218-6636
                </a>
              </td>
              <td>
                <div>
                  <p>Rua Lauro Reis, 1579 - Vila Marta</p>
                  <p>Franca - SP</p>
                  <p>14403-169</p>
                </div>
              </td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>2</th>
              <td>Bruno Guirra</td>
              <td>
                <a
                  href="mailto:br.guirra@email.com"
                  target="_blank"
                  className="link"
                >
                  br.guirra@email.com
                </a>
              </td>
              <td>
                <a href="tel:16992186636" className="link">
                  16 99218-6636
                </a>
              </td>
              <td>
                <div>
                  <p>Rua Lauro Reis, 1579 - Vila Marta</p>
                  <p>Franca - SP</p>
                  <p>14403-169</p>
                </div>
              </td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td>Bruno Guirra</td>
              <td>
                <a
                  href="mailto:br.guirra@email.com"
                  target="_blank"
                  className="link"
                >
                  br.guirra@email.com
                </a>
              </td>
              <td>
                <a href="tel:16992186636" className="link">
                  16 99218-6636
                </a>
              </td>
              <td>
                <div>
                  <p>Rua Lauro Reis, 1579 - Vila Marta</p>
                  <p>Franca - SP</p>
                  <p>14403-169</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
};
