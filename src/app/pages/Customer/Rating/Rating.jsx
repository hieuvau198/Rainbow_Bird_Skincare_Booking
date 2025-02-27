import React, { useState } from 'react';
import {
  Card,
  Rate,
  Button,
  Upload,
  Input,
  Typography,
  Tag,
  Row,
  Col
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;

// Example tags describing the service experience
const possibleTags = [
  'Great quality',
  'Very professional',
  'Worth the money',
  'Relaxing environment',
  'Friendly staff'
];

export default function SkincareServiceReview() {
  const [rating, setRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [comment, setComment] = useState('');
  const [fileList, setFileList] = useState([]);

  // Handle selecting/unselecting tags
  const handleTagChange = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Handle file uploads
  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // Submit the review
  const handleSubmit = () => {
    // Here you could call an API to store the review
    console.log({
      rating,
      selectedTags,
      comment,
      fileList
    });
    alert('Your review has been submitted!');

    // Reset the form (optional)
    setRating(0);
    setSelectedTags([]);
    setComment('');
    setFileList([]);
  };

  return (
    <Card
      style={{ maxWidth: 500, margin: '40px auto' }}
      bodyStyle={{ padding: '20px' }}
    >
      <Title level={4} style={{ marginBottom: 10 }}>
        Review Your Skincare Service
      </Title>
      <Text type="secondary" style={{ display: 'block', marginBottom: 20 }}>
        This service was completed 2 months ago
      </Text>

      {/* Star Rating */}
      <div style={{ marginBottom: 20, textAlign: 'center' }}>
        <Rate
          value={rating}
          onChange={(value) => setRating(value)}
          style={{ fontSize: 24 }}
        />
        <div style={{ marginTop: 8 }}>
          {rating
            ? `You have rated ${rating} star${rating > 1 ? 's' : ''}`
            : 'Tap on a star to rate'}
        </div>
      </div>

      {/* Tag Selection */}
      <div style={{ marginBottom: 20 }}>
        <Text strong style={{ display: 'block', marginBottom: 8 }}>
          Select your remarks:
        </Text>
        <Row gutter={[8, 8]}>
          {possibleTags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <Col key={tag}>
                <Tag
                  color={isSelected ? 'blue' : 'default'}
                  onClick={() => handleTagChange(tag)}
                  style={{ cursor: 'pointer' }}
                >
                  {tag}
                </Tag>
              </Col>
            );
          })}
        </Row>
      </div>

      {/* Comment Box */}
      <div style={{ marginBottom: 20 }}>
        <Text strong style={{ display: 'block', marginBottom: 8 }}>
          Share your experience:
        </Text>
        <TextArea
          rows={4}
          placeholder="Tell us what you enjoyed about this service..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      {/* Image Upload */}
      <div style={{ marginBottom: 20 }}>
        <Text strong style={{ display: 'block', marginBottom: 8 }}>
          Upload photos (max 3):
        </Text>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={handleUploadChange}
          beforeUpload={() => false} // Do not upload immediately; store locally in state
        >
          {fileList.length < 3 && (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
      </div>

      {/* Submit Button */}
      <Button
        type="primary"
        block
        onClick={handleSubmit}
        disabled={!rating || !comment}
      >
        Submit Review
      </Button>
    </Card>
  );
}
