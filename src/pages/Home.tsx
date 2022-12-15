import React from 'react';
import { Container, Row } from 'react-bootstrap';
import SubHeader from 'components/SubHeader';
import Layout from 'layouts';
import { MobileContext } from 'contexts/Mobile';
import DataCard from 'components/DataCard';
import { useFetch } from 'usehooks-ts';
import DataTable from 'components/DataTable';
import IPost from 'models/Post';
import ContextMenu from 'components/Context';
import ConfirmationModal from 'components/ConfirmationModal';
import { ReactComponent as BrokenImage } from 'assets/images/svgs/image.svg';
import { ReactComponent as Eye } from 'assets/images/svgs/eye.svg';
import { ReactComponent as Edit } from 'assets/images/svgs/edit.svg';
import { ReactComponent as Delete } from 'assets/images/svgs/delete.svg';
import { Pagination } from 'components/Pagination';
import { formatDate, truncateText } from 'utilities';
import { PAGE_SIZE } from 'utilities/constants';
import ViewModal from 'components/ViewModal';
import DeleteObject from 'models/DeleteObject';
import FloatingButton from 'components/FloatingButton';

function Home() {
  const { isMobile } = React.useContext(MobileContext);
  const [selectedViewPost, setSelectedViewPost] = React.useState<
    IPost | undefined
  >();
  const [selectedEditPost, setSelectedEditPost] = React.useState<
    IPost | undefined
  >();

  const [deletePost, setDeletePost] = React.useState<
    DeleteObject | undefined
  >();
  const [currentPage, setCurrentPage] = React.useState<string | number>(1);

  const handlePageChange = (pageNumber: string | number) => {
    setCurrentPage(pageNumber);
  };

  const { data, error } = useFetch<IPost[]>(
    'http://localhost:4000/api/v1/posts'
  );

  return (
    <>
      <ViewModal
        data={selectedViewPost}
        handleClose={() => setSelectedViewPost(undefined)}
      />

      <ConfirmationModal
        data={deletePost}
        handleClose={() => setDeletePost(undefined)}
      />

      <FloatingButton
        data={selectedEditPost}
        handleClose={() => setSelectedEditPost(undefined)}
      />

      <section className="home">
        <SubHeader title="Latest Posts" />

        <div className="section">
          <Container>
            {isMobile ? (
              <Row>
                {data?.map((item, i) => (
                  <DataCard
                    key={i}
                    data={item}
                    onClick={() => setSelectedViewPost(item)}
                  />
                ))}
              </Row>
            ) : (
              <DataTable loading={!data || !!error}>
                {data?.map((item, j) => (
                  <tr key={j}>
                    <td>
                      <span className="post__avatar">
                        <img
                          src={item.image_url}
                          className="post__avatar-img"
                          width={60}
                          height={60}
                        />

                        <BrokenImage className="broken-image" />
                      </span>
                    </td>

                    <td>
                      <span>{truncateText(item.title, 70)}</span>
                    </td>

                    <td>
                      <span>
                        Long: <strong>{item.long}</strong>
                      </span>
                      <br />
                      <span>
                        Lat: <strong>{item.lat}</strong>
                      </span>
                    </td>

                    <td>
                      <span>{truncateText(item.content)}</span>
                    </td>

                    <td>
                      <span>{formatDate(item.updated_at)}</span>
                    </td>

                    <td>
                      <ContextMenu>
                        <span
                          className="context__item"
                          onClick={() => setSelectedViewPost(item)}
                        >
                          <Eye width={18} height={18} className="me-1" />
                          View
                        </span>

                        <span
                          className="context__item"
                          onClick={() => setSelectedEditPost(item)}
                        >
                          <Edit width={18} height={18} className="me-1" />
                          Edit
                        </span>
                        <span
                          className="context__item color-red"
                          onClick={() =>
                            setDeletePost({
                              id: item.id,
                              title: item.title
                            })
                          }
                        >
                          <Delete
                            width={18}
                            height={18}
                            className="me-1 color-red"
                          />
                          Delete
                        </span>
                      </ContextMenu>
                    </td>
                  </tr>
                ))}
              </DataTable>
            )}

            {data && data?.length % PAGE_SIZE > 0 && (
              <div className="mt-4">
                <Pagination
                  currentPage={parseInt(`${currentPage}`, 10)}
                  totalCount={data?.length || 0}
                  onPageChange={(page) => handlePageChange(page)}
                />
              </div>
            )}
          </Container>
        </div>
      </section>
    </>
  );
}

export default Layout(Home);
