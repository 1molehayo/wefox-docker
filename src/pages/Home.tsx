import React from 'react';
import { Container, Row } from 'react-bootstrap';
import SubHeader from 'components/SubHeader';
import Layout from 'layouts';
import { MobileContext } from 'contexts/Mobile';
import DataCard from 'components/DataCard';
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
import { PostContext } from 'contexts/Posts';
import Loader from 'components/Loader';
import { notify } from 'utilities/toaster';

function Home() {
  const { isMobile } = React.useContext(MobileContext);
  const { fetchPosts, posts, error, loading } = React.useContext(PostContext);

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

  if (error) {
    notify({
      type: 'error',
      message: error
    });
  }

  React.useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <div className="position-relative">
                {loading && <Loader isLoading />}

                {!loading && (
                  <Row>
                    {posts?.map((item, i) => (
                      <DataCard
                        key={i}
                        data={item}
                        onClick={() => setSelectedViewPost(item)}
                      />
                    ))}
                  </Row>
                )}
              </div>
            ) : (
              <DataTable loading={loading}>
                {posts?.map((item, j) => (
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

            {posts && posts?.length % PAGE_SIZE > 0 && (
              <div className="mt-4">
                <Pagination
                  currentPage={parseInt(`${currentPage}`, 10)}
                  totalCount={posts?.length || 0}
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
