import React, { useState } from 'react';
import classnames from 'classnames';
import { ArrowContainer, Popover } from 'react-tiny-popover';
import { Button } from 'react-bootstrap';
import { ReactComponent as Ellipsis } from 'assets/images/svgs/ellipsis.svg';

interface IContextMenu {
  children: React.ReactNode;
  className?: string;
}

const ContextMenu = React.forwardRef<HTMLElement, IContextMenu>(
  ({ children, className }, ref) => {
    const [open, setOpen] = useState(false);

    const toggleContext = (event: React.MouseEvent<HTMLElement>) => {
      setOpen((prevState) => !prevState);
      event.stopPropagation();
    };

    return (
      <Popover
        containerClassName={classnames('context', className)}
        isOpen={open}
        positions={['bottom', 'left']}
        reposition={false}
        ref={ref}
        onClickOutside={() => setOpen(false)}
        content={({ position, childRect, popoverRect }) => (
          <ArrowContainer
            position={position}
            childRect={childRect}
            popoverRect={popoverRect}
            arrowSize={0}
            arrowColor={''}
          >
            <div className="context__menu" onClick={() => setOpen(false)}>
              {children}
            </div>
          </ArrowContainer>
        )}
      >
        <Button className="btn-subtle context__toggle" onClick={toggleContext}>
          <Ellipsis width={24} height={24} />
        </Button>
      </Popover>
    );
  }
);

ContextMenu.displayName = 'ContextMenu';

export default ContextMenu;
