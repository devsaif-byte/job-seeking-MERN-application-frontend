import { Button, Link } from "@nextui-org/react";

const Hero = () => {
	return (
		<section className="min-h-full w-full">
			<div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:justify-center lg:items-center">
				<div className="mx-auto max-w-xl text-center">
					<h1 className="text-3xl font-extrabold sm:text-5xl">
						<strong className="font-extrabold text-green-500 sm:block">
							The Easiest Way
						</strong>
						to Get Your New Job.
					</h1>

					<p className="mt-4 sm:text-xl/relaxed">
						Each month, more than 3 million job seekers turn to website in their
						search for work, making over 140,000 applications every single day.
					</p>

					<div className="mt-8 flex flex-wrap justify-center gap-4">
						<Link href="#">
							<Button
								variant="shadow"
								color="success"
								className="text-white"
								radius="full"
							>
								Get Started
							</Button>
						</Link>

						<Link href="#" color="foreground">
							Learn More
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
