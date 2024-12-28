import React from 'react';
import { CVPreview } from './CvPreview';

const CVComponent = React.forwardRef((props, ref) => {
    return (
        <div ref={ref}>
            <CVPreview />
        </div>
    );
});

export default CVComponent;
