import { Oval } from 'react-loader-spinner';
import { Wrapper } from './Loader.styled';

const Loader = () => {
    return <Wrapper>
                <Oval 
                        arialLabel="loading-indicator"
                        height={100}
                        width={100}
                        strokeWidth={5}
                        strokeWidthSecondary={1}
                        color="#76bdd5"
                        secondaryColor="#ffffff"
                    />
            </Wrapper>
}

export default Loader;
