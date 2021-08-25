import React, { RefObject } from 'react';

type Ref = HTMLInputElement;

interface BackgroundProps {
    ref: RefObject<HTMLInputElement>;
    defaultValue: string;
    handleBackgroundColorChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

interface Props {
    handleOnClick(): void;
}

export const BackgroundPicker: React.FC<BackgroundProps> = React.memo(React.forwardRef<Ref, BackgroundProps>((props, ref) => {
    return (
        <input type='color' className='canvas-background-picker' 
            ref={ref} defaultValue={props.defaultValue}
            onChange={(e) => props.handleBackgroundColorChange(e)}
        />
    );
}));

export const Grid: React.FC<Props> = React.memo((props) => {
    return (
        <button className='icon grid' onClick={() => props.handleOnClick()}/>
    );
});

export const TrashCan: React.FC<Props> = React.memo((props) => {
    return (
        <button className='icon trash-can' onClick={() => props.handleOnClick()}/>
    );
});

export const Save: React.FC<Props> = React.memo((props) => {
    return (
        <button className='icon save' onClick={() => props.handleOnClick()}/>
    );
});