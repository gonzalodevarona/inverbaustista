import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import DraggableUploadListItem from './DraggableUploadListItem';
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Button, Upload } from 'antd';

function FileUploader({ title, disabled, fileList, setFileList, readExcel, listType, accept, maxCount }) {

    const sensor = useSensor(PointerSensor, {
        activationConstraint: { distance: 10 },
    });

    const onDragEnd = ({ active, over }) => {
        if (active.id !== over?.id) {
            setFileList((prev) => {
                const activeIndex = prev.findIndex((i) => i.uid === active.id);
                const overIndex = prev.findIndex((i) => i.uid === over?.id);
                return arrayMove(prev, activeIndex, overIndex);
            });
        }
    };



    const onChange = ({ fileList: newFileList }) => {


        if (title.includes("archivo")) {

            setFileList(newFileList);

            for (const file of newFileList) {
                readExcel(file.originFileObj);
            }
        } else {
            setFileList(newFileList.map((file) => file.originFileObj));
        }
    };

    return (
        <div>
            <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
                <SortableContext items={fileList.map((i) => i.uid)} strategy={verticalListSortingStrategy}>
                    <Upload.Dragger
                        beforeUpload={() => false}
                        onChange={onChange}
                        multiple
                        fileList={fileList}
                        listType={listType}
                        accept={accept}
                        disabled={disabled}
                        maxCount={maxCount}
                    
                        itemRender={(originNode, file) => (
                            <DraggableUploadListItem originNode={originNode} file={file} />
                        )}
                    >
                        Arrastra {title} aqui o
                        <br />
                        <Button style={{ margin: "0 4em" }} icon={<UploadOutlined />}>
                            Haz click para subirl{title.includes("imagenes") ? "a" : "o"}s
                        </Button>

                    </Upload.Dragger>
                </SortableContext>
            </DndContext>
        </div>
    );



}

export default FileUploader