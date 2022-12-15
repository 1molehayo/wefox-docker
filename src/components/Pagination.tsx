import React from 'react';
import { Pagination as ReactPagination } from 'react-bootstrap';
import { usePagination, DOTS } from 'services/usePagination';
import classnames from 'classnames';
import { PAGE_SIZE } from 'utilities/constants';
import { MobileContext } from 'contexts/Mobile';

interface IPagination {
  className?: string;
  currentPage: number;
  // eslint-disable-next-line no-unused-vars
  onPageChange: (val: string | number) => void;
  pageSize?: number;
  siblingCount?: number;
  size?: 'lg' | 'sm';
  totalCount: number;
}

export const Pagination = ({
  className,
  currentPage,
  onPageChange,
  pageSize,
  siblingCount,
  size,
  totalCount
}: IPagination) => {
  const { isMobile } = React.useContext(MobileContext);

  const currentPageSize = pageSize || PAGE_SIZE;

  const paginationRange = usePagination({
    currentPage,
    pageSize: currentPageSize,
    siblingCount: siblingCount || 1,
    totalCount,
    isMobile
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const lastPage = paginationRange[paginationRange.length - 1];

  const onNext = () => {
    if (currentPage < lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const currentShowingStart = (currentPage - 1) * currentPageSize + 1;
  const currentShowingEnd = currentShowingStart - 1 + currentPageSize;

  return (
    <div className="pagination-wrapper">
      <p className="pagination__label">
        Showing <strong>{currentShowingStart}</strong> to{' '}
        <strong>
          {currentShowingEnd > totalCount ? totalCount : currentShowingEnd}
        </strong>{' '}
        of <strong>{totalCount}</strong>
      </p>

      <ReactPagination
        size={size || 'sm'}
        className={classnames(className, {
          'pagination--mobile': isMobile
        })}
      >
        <li
          className={classnames('page-item', {
            'page-item--arrow': isMobile,
            'page-item--disabled': currentPage === 1
          })}
          onClick={() => onPrevious()}
        >
          <span className="page-link ">
            <span className="icon-angle-left"></span>
          </span>
        </li>

        {paginationRange.map((pageNumber, i) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return <ReactPagination.Ellipsis key={i} />;
          }

          // Render our Page Pills
          return (
            <ReactPagination.Item
              active={pageNumber === currentPage}
              onClick={() => onPageChange(pageNumber)}
              key={i}
            >
              {pageNumber}
            </ReactPagination.Item>
          );
        })}

        <li
          className={classnames('page-item', {
            'page-item--arrow': isMobile,
            'page-item--disabled': currentPage === lastPage
          })}
          onClick={() => onNext()}
        >
          <span className="page-link">
            <span className="icon-angle-right"></span>
          </span>
        </li>
      </ReactPagination>
    </div>
  );
};
