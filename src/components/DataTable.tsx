import React from 'react';
import classnames from 'classnames';
import { Table as ReactTable } from 'react-bootstrap';
import Loader from 'components/Loader';
import NoData from 'components/NoData';

interface ITable {
  children: React.ReactNode;
  className?: string;
  loading: boolean;
  noDataDescription?: string;
  noDataClass?: string;
}

const DataTable = ({
  children,
  className,
  loading,
  noDataDescription,
  noDataClass
}: ITable) => {
  const headers = ['', 'Title', 'Co-ordinates', 'Content', 'Date', ''];

  return (
    <div className="data-table scrollbar scrollbar--table">
      <ReactTable
        borderless
        hover
        className={classnames(className, {
          'col-sticky':
            !headers[headers.length - 1] ||
            headers[headers.length - 1].toLowerCase() === 'action'
        })}
      >
        {headers && (
          <thead>
            <tr>
              {headers.map((item, i) => (
                <th
                  key={i}
                  style={{
                    whiteSpace: 'nowrap'
                  }}
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
        )}

        {!loading && <tbody>{children}</tbody>}
      </ReactTable>

      {loading && <Loader isLoading />}

      {!loading && (!children || !React.Children.count(children)) && (
        <NoData description={noDataDescription} className={noDataClass} />
      )}
    </div>
  );
};

export default DataTable;
