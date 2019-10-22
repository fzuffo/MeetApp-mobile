import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const Date = styled.Text`
  align-self: center;
  font-weight: bold;
  font-size: 20px;
  color: #fff;
  margin-top: 35px;
  margin-bottom: 35px;
`;

export const Card = styled.View`
  flex: 1;
  height: auto;
  max-width: 100%;
  border-radius: 4px;
  background: #fff;
  margin: 0 20px 20px 20px;
`;

export const ImageBanner = styled.Image`
  max-height: 150px;
  max-width: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const Title = styled.Text`
  margin: 20px 0 10px 18px;
  font-weight: bold;
  font-size: 18px;
  color: #333;
`;

export const Details = styled.Text`
  margin: 0 0 10px 40px;
  font-size: 13px;
  color: #999;
`;

export const SubmitButton = styled(Button)`
  margin: 20px;
`;
