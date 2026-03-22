import {useDraggable} from '@dnd-kit/react';

export default function User(params: any) {
    const { ref } = useDraggable({
        id: 'unique-id',
    });

    return (
        <button ref={ref} >
            {params.name}
        </button>
    );
}