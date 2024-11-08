import React, {useCallback, useState} from 'react';
import {Source} from '~/lib/convert-state';
import ConvertUI from './ConvertUi';
import {Probe} from './Probe';
import {Button} from './ui/button';

export const FileAvailable: React.FC<{
	readonly src: Source;
	readonly setSrc: React.Dispatch<React.SetStateAction<Source | null>>;
}> = ({src, setSrc}) => {
	const [probeDetails, setProbeDetails] = useState(false);

	const clear = useCallback(() => {
		setSrc(null);
	}, [setSrc]);

	return (
		<div className="overflow-y-auto w-full lg:flex lg:justify-center pt-6 pb-10 px-4">
			<div>
				<div className="block">
					<Button variant="link" onClick={clear}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 448 512"
							style={{height: 16}}
						>
							<path
								fill="currentcolor"
								d="M18.2 273l-17-17 17-17L171.8 85.4l17-17 33.9 33.9-17 17L93.1 232 424 232l24 0 0 48-24 0L93.1 280 205.8 392.6l17 17-33.9 33.9-17-17L18.2 273z"
							/>
						</svg>
						<div className="w-2" />
						Choose another file
					</Button>
				</div>
				<div className="lg:inline-flex lg:flex-row">
					<Probe
						src={src}
						probeDetails={probeDetails}
						setProbeDetails={setProbeDetails}
					/>
					{probeDetails ? null : (
						<>
							<div className="h-8 lg:h-0 lg:w-6" />
							<ConvertUI src={src} />
						</>
					)}
				</div>
			</div>
		</div>
	);
};
