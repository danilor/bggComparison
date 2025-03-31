import DataTable from 'datatables.net-react';
import DT, {Config} from 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';


DataTable.use(DT);

import data from './../data/organized.json';


export default function MainTable() {

    const options: Config = {
        paging: false,
        ordering: true,
        orderMulti: true,
        autoWidth: true,
    };


    const getData = () => {
        return data;
    }

    return (
        <DataTable options={options} className={'table table-striped table-responsive table-hover'}>
            <thead>
            <tr>
                <th scope={'col'}>IMAGE</th>
                <th scope={'col'}>NAME</th>
                <th scope={'col'}>
                    OWNER BY
                </th>

            </tr>
            </thead>
            <tbody>
            {getData().map((item: any, index: number) => (
                <tr key={item.name.toString() + index.toString()}>
                    <td>
                        <img src={item.image} alt={item.name} style={{width: '150px', height: 'auto'}}/>
                    </td>
                    <td>{item.name}</td>
                    <td>
                        {item.owned.map((owner: any, index: number) => (
                            <p key={'owned_by_' + index.toString()}>{owner}</p>
                        ))}
                    </td>

                </tr>
            ))}
            </tbody>
        </DataTable>
    );
}